import fetch from 'node-fetch';

export async function translateToUrdu(text: string): Promise<string> {
  const response = await fetch("http://localhost:8000/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`Translation failed: ${response.statusText}`);
  }

  type TranslatedText = {
    translatedText: string
  };

  const data = await response.json() as TranslatedText;
  return data.translatedText;
}


translateToUrdu("This is a test blog summary.")
  .then(result => console.log("Urdu Translation:", result))
  .catch(err => console.error("Error:", err));


  