import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'public/blog-data/blogs');
const CATEGORIES_FILE = path.join(process.cwd(), 'public/blog-data/categories.json');

// Ensure directories exist
export function ensureDirectories() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
  if (!fs.existsSync(CATEGORIES_FILE)) {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify([], null, 2));
  }
}

// Get all categories
export function getCategories() {
  ensureDirectories();
  try {
    const data = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Add category
export function addCategory(name: string) {
  ensureDirectories();
  const categories = getCategories();
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  if (categories.find((cat: any) => cat.slug === slug)) {
    throw new Error('Category already exists');
  }
  
  const newCategory = {
    id: Date.now().toString(),
    name,
    slug,
    createdAt: new Date().toISOString(),
  };
  
  categories.push(newCategory);
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
  return newCategory;
}

// Get all blogs
export function getAllBlogs() {
  ensureDirectories();
  try {
    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md'));
    return files.map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: markdown } = matter(content);
      return {
        id: file.replace('.md', ''),
        ...data,
        content: markdown,
      };
    });
  } catch {
    return [];
  }
}

// Get blog by ID
export function getBlogById(id: string) {
  ensureDirectories();
  try {
    const filePath = path.join(BLOG_DIR, `${id}.md`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: markdown } = matter(content);
    return {
      id,
      ...data,
      content: markdown,
    };
  } catch {
    return null;
  }
}

// Create new blog
export function createBlog(data: {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  categoryId: string;
  author?: string;
  published?: boolean;
}) {
  ensureDirectories();
  const id = Date.now().toString();
  const slug = data.title.toLowerCase().replace(/\s+/g, '-');
  
  const frontmatter = {
    title: data.title,
    excerpt: data.excerpt,
    image: data.image,
    category: data.categoryId,
    author: data.author || 'Admin',
    published: data.published !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const fileContent = `---
${Object.entries(frontmatter)
  .map(([key, value]) => `${key}: ${typeof value === 'string' ? `"${value}"` : value}`)
  .join('\n')}
---

${data.content}`;

  const filePath = path.join(BLOG_DIR, `${id}.md`);
  fs.writeFileSync(filePath, fileContent);
  
  return {
    id,
    ...frontmatter,
    content: data.content,
  };
}

// Update blog
export function updateBlog(id: string, data: Partial<any>) {
  ensureDirectories();
  const blog = getBlogById(id);
  if (!blog) {
    throw new Error('Blog not found');
  }
  
  const updated = {
    ...blog,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  const { content, ...frontmatter } = updated;
  
  const fileContent = `---
${Object.entries(frontmatter)
  .filter(([key]) => key !== 'id')
  .map(([key, value]) => `${key}: ${typeof value === 'string' ? `"${value}"` : value}`)
  .join('\n')}
---

${content}`;

  const filePath = path.join(BLOG_DIR, `${id}.md`);
  fs.writeFileSync(filePath, fileContent);
  
  return updated;
}

// Delete blog
export function deleteBlog(id: string) {
  ensureDirectories();
  const filePath = path.join(BLOG_DIR, `${id}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error('Blog not found');
  }
  fs.unlinkSync(filePath);
}
