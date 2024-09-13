"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Updated import for Next.js 13+
import author from "../public/static/img/avatar-1.webp";
import "./globals.css";
import { FaBookReader } from "react-icons/fa";
import Link from "next/link";

async function getBlogPosts() {
  const res = await fetch("http://127.0.0.1:8000/blog/blogposts/", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  return res.json();
}

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlogPosts();
        setBlogPosts(data);
        console.log(data);
      } catch (error) {
        setError(error.message || "An unexpected error occurred.");
      }
    }

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleBlogClick = (id) => {
    router.push(`/blog/${id}`); // Navigate to the dynamic blog post page
  };

  if (error) {
    return <p>Error loading blog posts: {error}</p>;
  }

  return (
    <>
      <div className="bg-white pb-6 mt-4 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            <div className="flex flex-col justify-between xl:w-5/12">
              <div></div>

              <div className="sm:text-center lg:py-12 lg:text-left xl:py-24">
                <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
                  Very proud to introduce
                </p>

                <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
                Exploring the World, One Story at a Time
                </h1>

                <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">


                  <Link
                    href="/about"
                    className="inline-block about-me-btn rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 focus-visible:ring active:bg-indigo-700 md:text-base"
                  >
                    
                    About Me
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                  >
                    Contact Me
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 sm:mt-16 lg:justify-start">
                <span className="text-sm font-semibold uppercase tracking-widest text-gray-400 sm:text-base">
                  Social
                </span>
                <span className="h-px w-12 bg-gray-200"></span>

                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/naanum_rowdy_thaaa/?utm_source=qr&igsh=MWplN3FwZDJ6bnozMw%3D%3D"
                    target="_blank"
                    className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/aravinth-sedhuraman-2407ba271?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  <a
                    href="https://aravinthan-portfolio.vercel.app/"
                    target="_blank"
                    className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                  >
                  <svg
                      className="h-5 w-5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.25c5.376 0 9.75 4.374 9.75 9.75S17.376 21.75 12 21.75 2.25 17.376 2.25 12 6.624 2.25 12 2.25zm0-1.5C5.92.75.75 5.92.75 12S5.92 23.25 12 23.25 23.25 18.08 23.25 12 18.08.75 12 .75zm3.745 3.5c.093.201.18.413.258.636l.105.31H12V4h2.004c.42.062.996.133 1.741.25zm-5.49 0H12v1.396H7.892l.105-.31c.078-.223.165-.435.257-.636.745-.117 1.321-.188 1.742-.25zm-3.828 4.5H12V7.146H5.073l-.015.088c-.13.741-.2 1.52-.229 2.316zm10.866-2.704L15.94 7.146V8.75h3.026c-.13-.741-.315-1.452-.596-2.04zm-.876 3.29H12v2.209h4.848a11.23 11.23 0 0 0-.066-.625 11.7 11.7 0 0 0-.184-1.148zM12 8.75V7.146h-3.94l-.123.354c-.3.887-.525 1.835-.663 2.75H12zm0 6.522v-2.209H7.368a10.825 10.825 0 0 0 .093.625c.03.209.068.415.112.625H12zm0 1.481H8.635c.32 1.492.912 2.786 1.757 3.659.514.27 1.116.431 1.758.431v-4.09zm4.244 0H12v4.09c.642 0 1.243-.161 1.758-.431.846-.873 1.437-2.167 1.758-3.659zM5.938 10.96a10.88 10.88 0 0 0-.185 1.148 11.31 11.31 0 0 0-.066.625h4.847v-2.209H5.938zm12.99 2.773h-3.94v2.209h3.94l.123-.354c.3-.887.525-1.835.663-2.75zm-10.616 0H5.073c.13.741.315 1.452.595 2.04l.122.354H8.06v-2.209zM18.927 12c-.03-.796-.1-1.575-.229-2.316l-.015-.088H15.94V8.75h2.968c.3.887.525 1.835.663 2.75h-.644z" />
                  </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
              <img
                src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&q=75&fit=crop&w=1000"
                loading="lazy"
                alt="Photo by Fakurian Design"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>
        </div>
      </div>
      <div className="bg-white pb-6 mt-4 sm:pb-8 lg:pb-12">
        <h2 className="text-4xl font-bold mb-8 text-center">Latest Articles</h2>
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
                <h2 className="underline-effect mt-3  mb-2">
                  <a href="#">{post.title}</a>
                </h2>
                {post.categories &&
                  post.categories.length > 0 &&
                  post.categories.map((category) => (
                    <span
                      key={category.id}
                      className="bg-gray-200 text-gray-700 rounded-full mt-4 px-3 py-1 text-sm mr-2 mb-4"
                    >
                      {category.name}
                    </span>
                  ))}

                <div className="flex items-center mb-4 mt-4">
                  <Image
                    src={author} // Replace with actual avatar
                    alt={post.author.username}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <p className="text-sm text-gray-500 ml-2">
                    By{" "}
                    <span className="text-pink-500">
                      {post.author.username}
                    </span>{" "}
                    - {formatDate(post.updated_at)}
                  </p>
                </div>
                <p className="text-slate-800 text-md line-clamp-3  mb-4">
                  {post.short_description}
                </p>
              </div>
              <div className="flex justify-between">
                <button className="text-white blog-btn bg-pink-500 px-4 py-2 rounded hover:bg-pink-600">
                  Read More
                </button>
                <span className="inline-block text-gray-600 text-sm">
                  {" "}
                  <FaBookReader /> 1 min read
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
