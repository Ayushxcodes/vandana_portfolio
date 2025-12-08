'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    createdAt: string;
    author: string;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
            {blog.category}
          </span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">By {blog.author}</span>
          <Link
            href={`/blog/${blog.id}`}
            className="text-purple-600 font-semibold hover:text-pink-600 transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
