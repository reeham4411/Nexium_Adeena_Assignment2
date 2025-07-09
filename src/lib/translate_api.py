from fastapi import FastAPI, Request
from googletrans import Translator
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
translator = Translator()

# Enable CORS for frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],  # Replace "" with your frontend URL for security
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/translate")
async def translate(request: Request):
    data = await request.json()
    text = data.get("text", "")
    translated = translator.translate(text, src='en', dest='es')
    return {"translatedText": translated.text}