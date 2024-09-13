'use client'; // Ensures this is a client component

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"; // Updated import for Next.js 13+
import { FaBookReader } from 'react-icons/fa';


export default function CategoryPage() {
  const { category } = useParams(); // Correctly extract the category from the URL
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/blog/categories/${category}/`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await res.json();
        setBlogPosts(data);
      } catch (error) {
        setError(error.message);
      }
    }

    if (category) {
      fetchBlogPosts();
    }
  }, [category]);

  if (error) {
    return <p>Error loading blog posts: {error}</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  const handleBlogClick = (id) => {
    router.push(`/blog/${id}`); // Navigate to the dynamic blog post page
  };


  return (
    <>
<div className="container mx-auto px-4 py-8">
  <h2 className="text-4xl font-bold mb-8 text-center">{category}</h2>
  <div className="flex justify-center gap-8 flex-wrap">
    {blogPosts.map((post) => (
      <div
        key={post.id}
        className=" rounded-lg  w-3/12 cursor-pointer transition-transform transform bg-slate-100 p-5 blog-card"
        onClick={() => handleBlogClick(post.id)}
      >
              {post.main_image && (
                <img
                  src={post.main_image}
                  alt={post.title}
                  className="w-full h-64  rounded-md shadow-lg mb-2 cursor-pointer transition-transform transform blog-img"
                />
              )}
        <div className="p-2">
          <h2 className="underline-effect mt-3  mb-2"><a href="#">{post.title}</a></h2>
          {post.categories && post.categories.length > 0 && post.categories.map((category) => (
            <span
              key={category.id}
              className="bg-gray-200 text-gray-700 rounded-full mt-4 px-3 py-1 text-sm mr-2 mb-4"
            >
              {category.name}
            </span>
          ))}

          <div className="flex items-center mb-4 mt-4">

            <p className="text-sm text-gray-500 ml-2">
              By <span className="text-pink-500">{post.author.username}</span> - {formatDate(post.updated_at)}
            </p>
          </div>
          <p className="text-slate-800 text-md line-clamp-3  mb-4">{post.short_description}</p>

          
        </div>
        <div className="flex justify-between">
          <button className="text-white blog-btn bg-pink-500 px-4 py-2 rounded hover:bg-pink-600">Read More</button>
          <span className="inline-block text-gray-600 text-sm"> <FaBookReader /> 1 min read</span>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  );
}
