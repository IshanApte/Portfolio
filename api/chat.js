// Vercel Serverless Function - Secure OpenAI API proxy
// API key is stored server-side only (never exposed to client)

import OpenAI from 'openai';

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
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('OpenAI API key not found in environment variables');
    return res.status(500).json({ 
      error: 'OpenAI API key not configured',
      fallback: true 
    });
  }

  try {
    const { messages, model = 'gpt-3.5-turbo', max_tokens = 150, temperature = 0.7 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Initialize OpenAI client (server-side only - key never exposed to client)
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Make the API call
    const response = await openai.chat.completions.create({
      model: model,
      messages: messages,
      max_tokens: max_tokens,
      temperature: temperature,
      presence_penalty: 0.6,
      frequency_penalty: 0.3
    });

    // Return the response with usage information
    return res.status(200).json({
      content: response.choices[0].message.content,
      usage: response.usage || null,
      model: response.model
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Return error without exposing sensitive information
    return res.status(500).json({ 
      error: 'Failed to generate response',
      message: error.message || 'Unknown error',
      fallback: true
    });
  }
}
