export async function generateAISummary(text: string): Promise<string> {
  const response = await fetch("http://localhost:8000/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`Summarization failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.summary;
}
