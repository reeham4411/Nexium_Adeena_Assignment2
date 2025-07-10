import { NextRequest, NextResponse } from 'next/server';
import { connectToMongo } from '@/lib/mongo';
import Blog from '@/lib/models/Blogs';
import { supabase } from '@/lib/supabase';
import { translateToUrdu } from '@/lib/translate';
import { generateAISummary } from '@/lib/summary';

export async function GET() {
  console.log('GET /api/summary hit');
  return NextResponse.json({ msg: 'GET is working' });
}

export async function POST(req: NextRequest) {
  console.log('POST /api/summary hit');
  try {
    const { blogId } = await req.json();
    console.log('Received blogId:', blogId);

    if (!blogId) {
      return NextResponse.json({ error: 'Missing blogId' }, { status: 400 });
    }

    await connectToMongo();
    const blog = await Blog.findById(blogId);

    if (!blog || !blog.fullText) {
      return NextResponse.json({ error: 'Blog not found or has no content' }, { status: 404 });
    }

    const fullText = blog.fullText;
    const summary = await generateAISummary(fullText);
    const urduSummary = await translateToUrdu(summary);
console.log('Urdu summary result:', urduSummary);
if (!urduSummary || typeof urduSummary !== 'string') {
  return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
}

    const { error } = await supabase.from('summaries').insert([
      {
        url: blog.url,
        summary: summary,
        translation: urduSummary,
        created_at: new Date().toISOString(),
      }
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save summary' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Summary and translation saved successfully.',
      summary: summary,
      translation: urduSummary,
    });

  } catch (err: any) {
    console.error('Summary generation error:', err.message);
    return NextResponse.json({ error: 'Something went wrong while summarizing.' }, { status: 500 });
  }
}
