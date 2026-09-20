// Vercel Serverless Function - Secure Jev API proxy
// API key is stored server-side only (never exposed to client)

export default async function handler(req, res) {
  // Enable CORS for your domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment variable (server-side only)
  const apiKey = process.env.JEV_API_KEY;

  if (!apiKey) {
    console.error('Jev API key not found in environment variables');
    return res.status(500).json({
      error: 'Jev API key not configured',
      fallback: true
    });
  }

  try {
    const { transcript, criteria } = req.body;

    if (!transcript || typeof transcript !== 'string') {
      return res.status(400).json({ error: 'transcript (string) is required' });
    }

    if (!criteria || typeof criteria !== 'object' || Array.isArray(criteria) || Object.keys(criteria).length === 0) {
      return res.status(400).json({ error: 'criteria (non-empty object of id -> description) is required' });
    }

    const jevResponse = await fetch('https://api.typesafe.ai/v1/systemone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        state: transcript,
        model: 'jev-latest',
        questions: {
          section: {
            type: 'choice',
            instructions: 'Which section of the portfolio site is the user asking to navigate to?',
            criteria
          }
        }
      })
    });

    if (!jevResponse.ok) {
      const errorText = await jevResponse.text().catch(() => '');
      console.error('Jev API error:', jevResponse.status, errorText);
      return res.status(502).json({
        error: 'Jev request failed',
        fallback: true
      });
    }

    const data = await jevResponse.json();
    const answer = data.answers?.section;

    console.log('[voice-nav]', {
      transcript,
      choice: answer?.choice ?? null,
      confidence: answer?.confidence ?? 0,
      probabilities: answer?.probabilities ?? {}
    });

    return res.status(200).json({
      choice: answer?.choice ?? null,
      confidence: answer?.confidence ?? 0,
      probabilities: answer?.probabilities ?? {}
    });

  } catch (error) {
    console.error('Jev API error:', error);

    // Return error without exposing sensitive information
    return res.status(500).json({
      error: 'Failed to resolve voice command',
      message: error.message || 'Unknown error',
      fallback: true
    });
  }
}
