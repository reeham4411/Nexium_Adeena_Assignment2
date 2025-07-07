import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { connectToMongo } from '@/lib/mongo';
import Blog from '@/lib/models/Blogs'; 

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing blog URL' }, { status: 400 });
    }

    // Fetching from the url
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extracting 
    const text = $('body').text().replace(/\s+/g, ' ').trim();

    if (!text || text.length < 100) {
      return NextResponse.json({ error: 'Failed to extract meaningful content' }, { status: 500 });
    }

    // Connect to MongoDB and insert blog
    await connectToMongo();
    await Blog.create({
      url,
      fullText: text,
      timestamp: new Date()
    });

    return NextResponse.json({ message: 'Blog content scraped and stored successfully.' });

  } catch (err: any) {
    console.error('Scrape error:', err.message);
    return NextResponse.json({ error: 'Something went wrong while scraping.' }, { status: 500 });
  }
}
