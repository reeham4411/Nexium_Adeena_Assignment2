import { NextRequest, NextResponse } from 'next/server';
import { connectToMongo } from '@/lib/mongo';
import Blog from '@/lib/models/Blogs';
import { supabase } from '@/lib/supabase';
import { translateToUrdu } from '@/lib/translate';

export async function POST(req: NextRequest) {
  try {
    const { blogId } = await req.json();

    if (!blogId) {
      return NextResponse.json({ error: 'Missing blogId' }, { status: 400 });
    }

    //  fetch blog text from MongoDB
    await connectToMongo();
    const blog = await Blog.findById(blogId);

    if (!blog || !blog.fullText) {
      return NextResponse.json({ error: 'Blog not found or has no content' }, { status: 404 });
    }

    const fullText = blog.fullText;

    // summary logic
    const summary = fullText.split('. ').slice(0, 3).join('. ') + '.';

    // Translate summary to Urdu
    const urduSummary = await translateToUrdu(summary);

    // Save to Supabase
    const { error } = await supabase.from('summaries').insert([
      {
        blog_url: blog.url,
        summary_en: summary,
        summary_ur: urduSummary,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save summary' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Summary and translation saved successfully.',
      summary_en: summary,
      summary_ur: urduSummary,
    });

  } catch (err: any) {
    console.error('Summary generation error:', err.message);
    return NextResponse.json({ error: 'Something went wrong while summarizing.' }, { status: 500 });
  }
}
