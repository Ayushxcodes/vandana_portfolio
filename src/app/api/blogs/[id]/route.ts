import { getBlogById, updateBlog, deleteBlog } from "@/lib/blog-utils";
import { NextRequest, NextResponse } from "next/server";

// GET single blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminPassword = request.headers.get("x-admin-password");
    
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, content, excerpt, image, category, author, published } = await request.json();

    const blog = await updateBlog(id, {
      ...(title && { title }),
      ...(content && { content }),
      ...(excerpt && { excerpt }),
      ...(image && { image }),
      ...(category && { category }),
      ...(author && { author }),
      ...(published !== undefined && { published }),
    });

    return NextResponse.json(blog);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminPassword = request.headers.get("x-admin-password");
    
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await deleteBlog(id);

    return NextResponse.json({ message: "Blog deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete blog" },
      { status: 500 }
    );
  }
}
