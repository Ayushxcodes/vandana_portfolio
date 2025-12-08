import { del, list, put } from "@vercel/blob";
import matter from "gray-matter";

type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

type BlogFrontmatter = {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type Blog = BlogFrontmatter & {
  id: string;
  content: string;
};

const BLOG_PREFIX = "blogs/";
const CATEGORIES_BLOB_PATH = "categories/categories.json";
type BlobFile = { pathname: string; url: string };

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const serializeFrontmatter = (frontmatter: Record<string, any>) =>
  Object.entries(frontmatter)
    .map(
      ([key, value]) => `${key}: ${typeof value === "string" ? `"${value}"` : value}`
    )
    .join("\n");

async function fetchBlobText(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch blob: ${response.statusText}`);
  }
  return response.text();
}

async function saveCategories(categories: Category[]) {
  await put(CATEGORIES_BLOB_PATH, JSON.stringify(categories, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

async function getCategoriesBlobUrl() {
  const { blobs } = await list({ prefix: "categories/" });
  const blobList = blobs as BlobFile[];
  return blobList.find((blob: BlobFile) => blob.pathname === CATEGORIES_BLOB_PATH)?.url || null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const url = await getCategoriesBlobUrl();
    if (!url) {
      await saveCategories([]);
      return [];
    }
    const data = await fetchBlobText(url);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addCategory(name: string): Promise<Category> {
  const categories = await getCategories();
  const slug = toSlug(name);

  if (categories.find((cat) => cat.slug === slug)) {
    throw new Error("Category already exists");
  }

  const newCategory: Category = {
    id: Date.now().toString(),
    name,
    slug,
    createdAt: new Date().toISOString(),
  };

  await saveCategories([...categories, newCategory]);
  return newCategory;
}

export async function updateCategory(id: string, payload: { name: string; slug?: string }) {
  const categories = await getCategories();
  const index = categories.findIndex((cat) => cat.id === id);

  if (index === -1) {
    throw new Error("Category not found");
  }

  const slug = toSlug(payload.slug || payload.name);
  const exists = categories.some((cat) => cat.slug === slug && cat.id !== id);
  if (exists) {
    throw new Error("Category already exists");
  }

  categories[index] = { ...categories[index], name: payload.name, slug };
  await saveCategories(categories);
  return categories[index];
}

export async function deleteCategoryById(id: string) {
  const categories = await getCategories();
  const index = categories.findIndex((cat) => cat.id === id);

  if (index === -1) {
    throw new Error("Category not found");
  }

  const [deleted] = categories.splice(index, 1);
  await saveCategories(categories);
  return deleted;
}

export async function getAllBlogs(): Promise<Blog[]> {
  try {
    const { blobs } = await list({ prefix: BLOG_PREFIX });
    const blobList = blobs as BlobFile[];
    const blogFiles = blobList.filter((blob: BlobFile) => blob.pathname.endsWith(".md"));

    const blogs = await Promise.all(
      blogFiles.map(async (blob: BlobFile) => {
        const content = await fetchBlobText(blob.url);
        const { data, content: markdown } = matter(content);
        return {
          id: blob.pathname.replace(BLOG_PREFIX, "").replace(".md", ""),
          ...(data as BlogFrontmatter),
          content: markdown,
        } as Blog;
      })
    );

    return blogs;
  } catch {
    return [];
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const { blobs } = await list({ prefix: `${BLOG_PREFIX}${id}.md` });
    const blobList = blobs as BlobFile[];
    const blob = blobList.find((entry: BlobFile) => entry.pathname === `${BLOG_PREFIX}${id}.md`);
    if (!blob) {
      return null;
    }

    const content = await fetchBlobText(blob.url);
    const { data, content: markdown } = matter(content);

    return {
      id,
      ...((data as BlogFrontmatter) || {}),
      content: markdown,
    } as Blog;
  } catch {
    return null;
  }
}

export async function createBlog(data: {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  categoryId: string;
  author?: string;
  published?: boolean;
}) {
  const id = Date.now().toString();

  const frontmatter: BlogFrontmatter = {
    title: data.title,
    excerpt: data.excerpt,
    image: data.image,
    category: data.categoryId,
    author: data.author || "Admin",
    published: data.published !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const fileContent = `---
${serializeFrontmatter(frontmatter)}
---

${data.content}`;

  await put(`${BLOG_PREFIX}${id}.md`, fileContent, {
    access: "public",
    addRandomSuffix: false,
    contentType: "text/markdown; charset=utf-8",
  });

  return {
    id,
    ...frontmatter,
    content: data.content,
  };
}

export async function updateBlog(id: string, data: Partial<Blog>) {
  const existing = await getBlogById(id);
  if (!existing) {
    throw new Error("Blog not found");
  }

  const content = data.content ?? existing.content;
  const updated: Blog = {
    ...existing,
    ...data,
    content,
    updatedAt: new Date().toISOString(),
  };

  const { content: markdown, id: _, ...frontmatter } = updated;

  const fileContent = `---
${serializeFrontmatter(frontmatter)}
---

${markdown}`;

  await put(`${BLOG_PREFIX}${id}.md`, fileContent, {
    access: "public",
    addRandomSuffix: false,
    contentType: "text/markdown; charset=utf-8",
  });

  return updated;
}

export async function deleteBlog(id: string) {
  const { blobs } = await list({ prefix: `${BLOG_PREFIX}${id}.md` });
  const blobList = blobs as BlobFile[];
  const blob = blobList.find((entry: BlobFile) => entry.pathname === `${BLOG_PREFIX}${id}.md`);

  if (!blob) {
    throw new Error("Blog not found");
  }

  await del(blob.url);
}
