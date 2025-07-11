SummixAI - AI-Powered Blog Summarizer & Urdu Translator
SummixAI is a full-stack application that scrapes blog content using a URL using ScrapingBee, generates a concise English summary with HuggingFace’s BART model, and translates it into Urdu using Google Translate. It also stores original and summarized content in MongoDB and Supabase.

🌐 Deployed Frontend
Visit the app here: https://your-vercel-app.vercel.app

🚀 Features
📄 Scrape blog content using a URL

🧠 AI-based English summarization (BART model)

🌐 Urdu translation using Google Translate

☁️ Stores full text in MongoDB, summaries in Supabase

📥 Download summaries easily

🖥️ Frontend with Next.js, TailwindCSS, and ShadCN UI

🔌 Backend with FastAPI and Transformers

📁 Project Structure

assignment-2/
├── src/
│ ├── app/ # Next.js app
│ ├── components/ # UI components
│ ├── lib/
│ │ ├── translate_Api.py # FastAPI backend (local)
│ │ ├── mongo.ts # MongoDB setup
│ │ ├── supabase.ts # Supabase setup
│ │ ├── models/Blogs.ts # Mongoose schema
| | |── api/
| | | └── summary/route.ts
│ │ └── scrape/route.ts # Scraping logic (Next.js API route)
│ │ └── fetch-latest-blog/route.ts
├── public/
├── .env.local # Environment variables
└── README.md
🧠 How It Works
User submits a blog URL from the frontend.

Backend scrapes the content using ScrapingBee API.

Scraped content is saved to MongoDB.

The latest blog is fetched and sent to the FastAPI backend for summarization.

Summary is translated to Urdu.

Result is saved to Supabase and shown to the user.

🛠️ Tech Stack
Frontend: Next.js,Tailwind CSS, TypeScript
Backend: FastApi,HuggingFace, Transformers
Storage:MongoDB Atlas, Supabase
Others: Google Translate API, ScrapingBee API,Vercel

🖥️ Running the Project Locally

1. Clone the repository

   git clone https://github.com/reeham4411/blogsummarizer.git
   cd blogsummarizer

2. Setup the Frontend (Next.js)

   cd src
   npm install
   Create a .env.local file in the src/ directory:

env

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
MONGODB_URI=your_mongo_connection_string
SCRAPINGBEE_API_KEY=your_scrapingbee_key

To start frontend:
npm run dev

3. Setup the Backend (FastAPI)
   Install dependencies (inside src/lib):

cd src/lib
python -m venv venv
venv\Scripts\activate # Windows
source venv/bin/activate # Mac/Linux

pip install -r requirements.txt
requirements.txt should include:

fastapi
uvicorn
googletrans==4.0.0-rc1
transformers
torch

Run FastAPI:
uvicorn translate_api:app --reload
🌍 Deployment
Frontend (Vercel)
Push your code to GitHub.

Import project on https://vercel.com

Set the following Environment Variables in Vercel Dashboard:
SUPABASE_URL=YOUR SUPABASE URL
SUPABASE_KEY=YOUR SUPABASE KEY
MONGODB_URI=YOUR MONGODB URL
SCRAPINGBEE_API_KEY=YOUR SCRAPING BEE KEY

✅ Example Usage
Try using any of these blogs:

https://www.theverge.com/2023/07/01/snapchat-ai-bot-features

https://blog.google/technology/ai/gemini-google-new-ai-model/

https://openai.com/index/introducing-chatgpt/

📝 To Test Locally:

# In one terminal

cd src
npm run dev

# In another terminal

cd src/lib
uvicorn translate_api:app --reload

🛡️ Limitations
Free tier APIs might limit request volumes.

Some blog websites may block ScrapingBee even with headers.

Large text summaries may take 10–15s to load.

📌 Future Improvements
Add user authentication.

Allow file upload (PDF, TXT).

Add summary history view.

📃 License
MIT License. Free to use, modify, and share.
