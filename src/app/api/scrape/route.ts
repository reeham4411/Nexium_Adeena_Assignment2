import { NextRequest, NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";
import Blog from "@/lib/models/Blogs";
import axios from "axios";

const SCRAPINGBEE_API_KEY = process.env.SCRAPINGBEE_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "Missing blog URL" }, { status: 400 });
    }

    // Fetch from ScrapingBee
    interface ScrapingBeeResponse {
      content: string;
      [key: string]: any;
    }

    const response = await axios.get<ScrapingBeeResponse>("https://app.scrapingbee.com/api/v1", {
      params: {
        api_key: SCRAPINGBEE_API_KEY,
        url,
        extract_rules: JSON.stringify({
          content: "body"
        }),
      },
    });

    const fullText = response.data?.content;
    if (!fullText || fullText.length < 100) {
      return NextResponse.json({ error: "Failed to extract blog content" }, { status: 422 });
    }

    await connectToMongo();
    await Blog.create({
      url,
      fullText,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: "Blog content stored successfully." });
  } catch (err: any) {
    console.error("Scrape error:", err.message);
    return NextResponse.json({ error: "Scraping failed." }, { status: 500 });
  }
}
