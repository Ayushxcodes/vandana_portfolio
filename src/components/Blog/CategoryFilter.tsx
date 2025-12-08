'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  slug?: string;
}

interface CategoryFilterProps {
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (id: string | null) => {
    setSelectedCategory(id);
    onCategoryChange(id);
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading categories...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Categories</h3>
      <button
        onClick={() => handleCategoryClick(null)}
        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Blogs
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === category.id
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
