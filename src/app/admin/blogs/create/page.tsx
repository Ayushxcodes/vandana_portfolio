'use client';

import BlogForm from '@/components/Admin/BlogForm';

export default function CreateBlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Create New Blog</h1>
          <p className="text-lg opacity-90">Write and publish a new blog post</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <BlogForm />
        </div>
      </div>
    </div>
  );
}
