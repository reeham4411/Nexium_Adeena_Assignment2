import { connectToMongo } from "@/lib/mongo";
import Blog from "@/lib/models/Blogs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongo();

    const latestBlog = await Blog.findOne().sort({ timestamp: -1 });

    if (!latestBlog) {
      return NextResponse.json({ error: "No blog found" }, { status: 404 });
    }

    return NextResponse.json({ blogId: latestBlog._id });
  } catch (err: any) {
    console.error("Error fetching latest blog:", err.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
