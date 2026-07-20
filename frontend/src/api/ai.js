export async function generateHooks(topic, language) {
  try {
  const response = await fetch(
  "https://ai-youtube-automation-2j3o.onrender.com/hooks/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          language,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Server Error");
    }

    return await response.json();

  } catch (error) {
    return {
      error: true,
      message: "Something went wrong. Please try again."
    };
  }
}