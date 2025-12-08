import { deleteCategoryById, updateCategory } from "@/lib/blog-utils";
import { NextRequest, NextResponse } from "next/server";

// PUT update category
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

    const { name, slug } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await updateCategory(id, { name, slug });
    return NextResponse.json(category);
  } catch (error: any) {
    const message = error?.message || "Failed to update category";
    const status = message === "Category not found" ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

// DELETE category
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

    const deletedCategory = await deleteCategoryById(id);
    return NextResponse.json({ message: "Category deleted", category: deletedCategory });
  } catch (error: any) {
    const message = error?.message || "Failed to delete category";
    const status = message === "Category not found" ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
