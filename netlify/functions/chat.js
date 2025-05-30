// netlify/functions/chat.js
exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};