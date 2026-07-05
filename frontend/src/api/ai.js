export async function generateHooks(topic, language) {
  const response = await fetch("http://127.0.0.1:8000/hooks/", {
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