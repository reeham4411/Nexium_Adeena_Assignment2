import { NextRequest, NextResponse } from 'next/server';
import { connectToMongo } from '@/lib/mongo';
import Blog from '@/lib/models/Blogs';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing blog URL' }, { status: 400 });
    }


    const mockText = `
     In today’s fast-paced digital world, people are constantly overwhelmed by the amount of content available online. From blog posts and articles to news updates and social media feeds, the average user is exposed to thousands of pieces of information every single day. This flood of content makes it difficult to focus, retain key points, or even find time to read through everything.

That’s where the concept of content summarization becomes extremely valuable. By condensing large volumes of information into concise summaries, users can quickly grasp the core ideas without needing to read the full text. This not only saves time but also helps improve comprehension and decision-making.

Artificial Intelligence has played a vital role in the rise of automated summarization tools. These tools use advanced natural language processing techniques to understand and rephrase the main ideas of a document. While some rely on extractive summarization—picking out key sentences from the original—others use abstractive methods that rewrite content in a shorter form.

Regardless of the method, the ultimate goal remains the same: helping readers get to the point faster. Whether it’s for students trying to revise study material or professionals reviewing lengthy reports, summarization tools have become an essential productivity asset in the information age.

    `;

    // Save to MongoDB 
    await connectToMongo();
    await Blog.create({
      url,
      fullText: mockText.trim(),
      timestamp: new Date()
    });

    return NextResponse.json({ message: 'Mock blog content stored successfully.' });

  } catch (err: any) {
    console.error('Scrape error:', err.message);
    return NextResponse.json({ error: 'Something went wrong during simulation.' }, { status: 500 });
  }
}
