import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite injects the built stylesheet as a plain render-blocking <link rel="stylesheet">.
// Swap it for the preload+onload pattern (same trick already used for Google Fonts below)
// so the CSS downloads without blocking first paint, with a <noscript> fallback for crawlers/no-JS.
function asyncCss() {
  return {
    name: 'async-css',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"(?: crossorigin)? href="([^"]+\.css)">/,
        (_match, href) =>
          `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`
      )
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), asyncCss()],
})
