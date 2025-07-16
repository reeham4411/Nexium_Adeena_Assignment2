from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
from transformers import pipeline
import logging
app = FastAPI()
translator = Translator()
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Enable CORS for frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/summarize")
async def summarize(request: Request):
    logger.info("POST /summarize called")

    data = await request.json()
    text = data.get("text", "")
    logger.info(f"Received text length: {len(text)}")

    if not text:
        logger.warning("No text provided in request")
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

        logger.info(f"Split into {len(chunks)} chunks")

        # Summarize each chunk
        summary_parts = []
        for idx, chunk in enumerate(chunks):
            logger.info(f"Summarizing chunk {idx + 1}/{len(chunks)} (length: {len(chunk)})")
            result = summarizer(
                chunk,
                max_length=150,
                min_length=40,
                do_sample=True,
                temperature=0.8,
                top_k=50,
                top_p=0.95
            )
            summary_parts.append(result[0]['summary_text'])

        full_summary = " ".join(summary_parts)
        logger.info("Summarization successful")
        return {"summary": full_summary}

    except Exception as e:
        logger.error(f"Summarization failed: {e}")
        return {"error": str(e)}

@app.post("/translate")
async def translate(request: Request):
    data = await request.json()
    text = data.get("text", "")
    translated = translator.translate(text, src='en', dest='ur')
    return {"translatedText": translated.text}
