const response = await fetch(
  "https://api-inference.huggingface.co/models/chatbot", // your HF model
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: message })
  }
);
