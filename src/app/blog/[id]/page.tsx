'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <Link href="/blog" className="text-purple-600 hover:text-pink-600 font-semibold">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden bg-gray-200">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="text-purple-600 hover:text-pink-600 font-semibold mb-6 inline-block"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
              {blog.category}
            </span>
            <span>{formattedDate}</span>
            <span>By {blog.author}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-gray-600 mb-8 pb-8 border-b border-gray-200">
          {blog.excerpt}
        </p>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 text-gray-700" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 text-gray-700" {...props} />,
                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-purple-600 pl-4 italic my-4 text-gray-600" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600" {...props} />
                ),
                pre: ({ node, ...props }) => (
                  <pre className="bg-gray-900 text-white p-4 rounded-lg mb-4 overflow-x-auto" {...props} />
                ),
                a: ({ node, ...props }) => <a className="text-purple-600 hover:text-pink-600 underline" {...props} />,
                img: ({ node, ...props }) => <img className="max-w-full h-auto my-4 rounded-lg" {...props} />,
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
