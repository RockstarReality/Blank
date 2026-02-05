// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  // Your Hugging Face token stored as environment variable
  const HF_TOKEN = process.env.HF_TOKEN;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/chatbot", // your model name
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
    const botReply = data?.[0]?.generated_text || "Sorry, I didn't understand that.";
    res.status(200).json({ reply: botReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error connecting to Hugging Face API." });
  }
}
