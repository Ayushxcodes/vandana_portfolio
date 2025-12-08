import { getAllBlogs, createBlog } from "@/lib/blog-utils";
import { NextRequest, NextResponse } from "next/server";

// GET all published blogs with optional category filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("category");

    let blogs = (await getAllBlogs()).filter((blog: any) => blog.published !== false);

    if (categoryId) {
      blogs = blogs.filter((blog: any) => blog.category === categoryId);
    }

    return NextResponse.json(blogs.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const adminPassword = request.headers.get("x-admin-password");
    
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, content, excerpt, image, category, author } = await request.json();

    if (!title || !content || !excerpt || !image || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const blog = await createBlog({
      title,
      content,
      excerpt,
      image,
      categoryId: category,
      author: author || "Admin",
      published: true,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}
