from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
from transformers import pipeline

app = FastAPI()
translator = Translator()
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Enable CORS for frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/summarize")
async def summarize(request: Request):
    data = await request.json()
    text = data.get("text", "")
    if not text:
        return {"summary": ""}

    try:
        # Split large text into smaller chunks
        max_chunk_size = 900
        sentences = text.split(". ")
        chunks = []
        chunk = ""

        for sentence in sentences:
            if len(chunk) + len(sentence) < max_chunk_size:
                chunk += sentence + ". "
            else:
                chunks.append(chunk.strip())
                chunk = sentence + ". "
        if chunk:
            chunks.append(chunk.strip())

        # Summarize each chunk
        summary_parts = []
        for chunk in chunks:
            result = summarizer(chunk, max_length=150, min_length=40, do_sample=False)
            summary_parts.append(result[0]['summary_text'])

        full_summary = " ".join(summary_parts)
        return {"summary": full_summary}

    except Exception as e:
        return {"error": str(e)}

@app.post("/translate")
async def translate(request: Request):
    data = await request.json()
    text = data.get("text", "")
    translated = translator.translate(text, src='en', dest='ur')
    return {"translatedText": translated.text}
