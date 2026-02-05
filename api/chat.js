// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  // Get the token from Vercel environment variable
  const HF_TOKEN = process.env.HF_TOKEN;

  if (!HF_TOKEN) {
    console.error("HF_TOKEN is missing!");
    return res.status(500).json({ reply: "Server error: HF_TOKEN not found." });
  }

  try {
    // Call Hugging Face model
    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: message })
      }
    );

    const data = await response.json();
    console.log("Hugging Face response:", data);

    if (!data || !data[0]?.generated_text) {
      return res.status(500).json({ reply: "AI did not return a proper response." });
    }

    const botReply = data[0].generated_text;
    res.status(200).json({ reply: botReply });

  } catch (err) {
    console.error("Error calling Hugging Face API:", err);
    res.status(500).json({ reply: "Error connecting to Hugging Face API." });
  }
}
