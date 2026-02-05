// File: /api/chat.js

export default async function handler(req, res) {
  // === 1. CORS headers ===
  // Allow your Hostinger site (or any site) to call this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*'); // * = any site, you can replace with your Hostinger URL
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'No message provided' });
      return;
    }

    // === 2. Bot logic ===
    // For now, simple echo; replace this with your real chatbot logic
    const reply = `Bot says: ${message}`;

    // === 3. Send response ===
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
