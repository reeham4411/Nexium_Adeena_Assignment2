# SummixAI - AI-Powered Blog Summarizer & Urdu Translator

SummixAI is a full-stack AI-powered application that:

- Scrapes blog content from a URL using the ScrapingBee API
- Summarizes the blog using HuggingFace's BART model (via FastAPI backend)
- Translates the summary to Urdu using Google Translate
- Stores original content in MongoDB and summaries in Supabase
- Displays results via a beautifully styled Next.js frontend

---

## 🌐 Deployed Frontend

🔗 Visit the app here: [https://your-vercel-app.vercel.app](https://your-vercel-app.vercel.app)

---

## 🚀 Features

- 📄 Scrape blog content using a URL
- 🧠 AI-based English summarization (BART model)
- 🌐 Urdu translation using Google Translate
- ☁️ Stores full text in MongoDB, summaries in Supabase
- 📥 Download summaries easily
- 🖥️ Frontend with Next.js, TailwindCSS, and ShadCN UI
- 🔌 Backend with FastAPI and Transformers

---

## 📁 Project Structure

```
assignment-2/
├── src/
│   ├── app/                 # Next.js app pages and routes
│   │   ├── api/
│   │   │   ├── fetch-latest-blog/route.ts
│   │   │   ├── scrape/route.ts
│   │   │   └── summary/route.ts
│   ├── components/          # UI components
│   ├── lib/
│   │   ├── translate_Api.py # FastAPI backend (local only)
│   │   ├── mongo.ts         # MongoDB setup
│   │   ├── supabase.ts      # Supabase setup
│   │   └── models/Blogs.ts  # Mongoose schema
├── public/
├── .env.local               # Environment variables
└── README.md
```

---

## 🧠 How It Works

1. User submits a blog URL from the frontend
2. Backend scrapes the content using ScrapingBee API
3. Scraped content is saved to MongoDB
4. The latest blog is fetched and sent to the FastAPI backend for summarization
5. Summary is translated to Urdu
6. Summary and translation are saved to Supabase
7. Results are shown to the user

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript, ShadCN UI
- **Backend**: FastAPI, HuggingFace Transformers
- **Storage**: MongoDB Atlas, Supabase
- **Other APIs**: ScrapingBee, Google Translate
- **Hosting**: Vercel (frontend), Local backend (FastAPI)

---

## 🖥️ Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/reeham4411/blogsummarizer.git
cd blogsummarizer
```

### 2. Setup the Frontend (Next.js)

```bash
cd src
npm install
```

### 3. Create `.env.local` inside `src/` with:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
MONGODB_URI=your_mongodb_connection_string
SCRAPINGBEE_API_KEY=your_scrapingbee_key
```

### 4. Start the Frontend

```bash
npm run dev
```

### 5. Setup the Backend (FastAPI)

```bash
cd lib
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 6. `requirements.txt` should include:

```
fastapi
uvicorn
transformers
torch
googletrans==4.0.0-rc1
```

### 7. Run FastAPI

```bash
uvicorn translate_Api:app --reload
```

---

## 🌍 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import your repo to [https://vercel.com](https://vercel.com)
3. Set the following environment variables in Vercel dashboard:

   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `MONGODB_URI`
   - `SCRAPINGBEE_API_KEY`
   - `BACKEND_API_URL=http://localhost:8000` (for local use)

✅ Your frontend will be deployed on a Vercel URL

> ❗ Note: You still need to run your FastAPI backend locally or deploy it separately if required.

---

## ✅ Example URLs to Test

- [https://www.theverge.com/2023/07/01/snapchat-ai-bot-features](https://www.theverge.com/2023/07/01/snapchat-ai-bot-features)
- [https://blog.google/technology/ai/gemini-google-new-ai-model/](https://blog.google/technology/ai/gemini-google-new-ai-model/)
- [https://openai.com/index/introducing-chatgpt/](https://openai.com/index/introducing-chatgpt/)

---

## 🧪 To Test Locally

In two terminals:

### Terminal 1: Frontend

```bash
cd src
npm run dev
```

### Terminal 2: Backend

```bash
cd src/lib
uvicorn translate_Api:app --reload
```

---

## 🛡️ Limitations

- Free tier APIs have request limits (ScrapingBee, Supabase)
- Some blog sites may block scraping due to headers
- AI summarization may take 10–15 seconds for large blogs

---

## 📌 Future Improvements

- Add authentication
- Upload PDF/TXT files for summarization
- View summary history for users
- Deploy backend on Render/Railway if needed

---

## 📃 License

MIT License — Free to use, modify, and share.
