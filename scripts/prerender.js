// Post-build step: snapshots real rendered HTML for known static routes so
// crawlers that don't execute JS (SEO auditors, some search bots) see the
// actual h1/h2/etc instead of an empty <div id="root"> shell.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
};

async function resolveFilePath(urlPath) {
  let filePath = path.join(distDir, decodeURIComponent(urlPath));
  if (existsSync(filePath) && (await stat(filePath)).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!existsSync(filePath)) {
    // SPA fallback, mirrors the Vercel rewrite in vercel.json
    filePath = path.join(distDir, 'index.html');
  }
  return filePath;
}

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const filePath = await resolveFilePath(req.url.split('?')[0]);
      const ext = path.extname(filePath);
      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    } catch (err) {
      res.writeHead(404);
      res.end('Not found');
    }
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

const ROUTES = [
  { route: '/', out: 'index.html', waitFor: 'h1' },
  { route: '/blog', out: 'blog/index.html', waitFor: 'h1' },
  { route: '/privacy-policy', out: 'privacy-policy/index.html', waitFor: 'h1' },
];

async function run() {
  const server = await startServer();
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({ headless: 'new' });

  try {
    for (const { route, out, waitFor } of ROUTES) {
      const page = await browser.newPage();
      // Skips the GSAP SplitText word-animation, which otherwise fragments
      // heading text into per-word <div>s at snapshot time.
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.waitForSelector(waitFor, { timeout: 10000 }).catch(() => {});
      const html = await page.evaluate(() => '<!DOCTYPE html>\n' + document.documentElement.outerHTML);
      await page.close();

      const outPath = path.join(distDir, out);
      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, html, 'utf-8');
      console.log(`Prerendered ${route} -> dist/${out}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
