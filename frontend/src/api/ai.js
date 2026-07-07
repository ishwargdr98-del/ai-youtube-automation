export async function generateHooks(topic, language) {
  const response = await fetch("https://smartwork-ai-backend.onrender.com/hooks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      language,
    }),
  });

  return await response.json();
}