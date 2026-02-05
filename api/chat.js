export default async function handler(req, res) {
  // ✅ Allow requests from anywhere (Hostinger included)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: 'No message sent' });
    }

    // Example response — replace with your bot logic
    const botReply = `You said: ${message}`;

    return res.status(200).json({ reply: botReply });
  } else {
    return res.status(405).json({ reply: 'Method not allowed' });
  }
}
