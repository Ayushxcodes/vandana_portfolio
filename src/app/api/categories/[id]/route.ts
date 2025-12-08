import { getCategories, addCategory } from "@/lib/blog-utils";
import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const CATEGORIES_FILE = path.join(process.cwd(), "public", "blog-data", "categories.json");

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

    // Read current categories
    const categoriesData = fs.readFileSync(CATEGORIES_FILE, "utf-8");
    const categories = JSON.parse(categoriesData);

    // Find and update category
    const categoryIndex = categories.findIndex((cat: any) => cat.id === id);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    categories[categoryIndex] = {
      ...categories[categoryIndex],
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
    };

    // Write back to file
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));

    return NextResponse.json(categories[categoryIndex]);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update category" },
      { status: 500 }
    );
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

    // Read current categories
    const categoriesData = fs.readFileSync(CATEGORIES_FILE, "utf-8");
    const categories = JSON.parse(categoriesData);

    // Find and remove category
    const categoryIndex = categories.findIndex((cat: any) => cat.id === id);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const deletedCategory = categories[categoryIndex];
    categories.splice(categoryIndex, 1);

    // Write back to file
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));

    return NextResponse.json({ message: "Category deleted", category: deletedCategory });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
