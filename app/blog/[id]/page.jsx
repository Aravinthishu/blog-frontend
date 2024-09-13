"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import author from '../../../public/static/img/avatar-1.webp'

// Function to fetch a single blog post
async function fetchBlogPost(id) {
  const res = await fetch(`http://127.0.0.1:8000/blog/blogposts/${id}/`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch the blog post');
  }
  return res.json();
}

// Function to fetch all blog posts for recommendations
async function fetchAllBlogPosts() {
  const res = await fetch(`http://127.0.0.1:8000/blog/blogposts/`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return res.json();
}

// Function to fetch comments for a specific blog post
async function fetchComments(blogPostId) {
  const res = await fetch(`http://127.0.0.1:8000/blog/comments/?blog_post=${blogPostId}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }
  return res.json();
}

// Function to post a new comment
async function postComment(blogPostId, commentContent, accessToken) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/blog/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        blog_post: blogPostId,
        content: commentContent,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("Response Error Data:", errorData); // Log the error response
      throw new Error('Failed to post the comment');
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Function to like a comment
async function likeComment(commentId, accessToken) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/blog/comments/${commentId}/like/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("Response Error Data:", errorData); // Log the error response
      throw new Error('Failed to like the comment');
    }
    console.log(commentId)
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function postReply(commentId, replyContent, accessToken) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/blog/replies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        comment: commentId,  // Make sure this is being sent correctly
        content: replyContent,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("Response Error Data:", errorData);
      throw new Error('Failed to post the reply');
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    console.log(commentId)
    throw err;
  }
}


// Shuffle an array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function BlogPost({ params }) {
  const { id } = params;
  const [blogPost, setBlogPost] = useState(null);
  const [allBlogPosts, setAllBlogPosts] = useState([]);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [commentIdForReply, setCommentIdForReply] = useState(null);
  const [errorComment, setErrorComment] = useState(null);
  const [errorReply, setErrorReply] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();


  const handleBlogClick = (id) => {
    router.push(`/blog/${id}`); // Navigate to the dynamic blog post page
  };

  useEffect(() => {
    if (id) {
      // Fetch the blog post data
      fetchBlogPost(id)
        .then(setBlogPost)
        .catch((err) => setError(err.message || 'An unexpected error occurred.'));

      // Fetch all blog posts
      fetchAllBlogPosts()
        .then(setAllBlogPosts)
        .catch((err) => setError(err.message || 'An unexpected error occurred.'));

      // Fetch comments for the current blog post
      fetchComments(id)
        .then(setComments)
        .catch((err) => setError(err.message || 'An unexpected error occurred.'));

      // Fetch the access token from localStorage
      const token = localStorage.getItem('accessToken');
      setAccessToken(token); // Ensure the token is available
    }
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!accessToken) {
      setErrorComment('You must be logged in to post a comment.');
      router.push("/account/login");
      return;
    }

    try {
      await postComment(id, newComment, accessToken);
      setNewComment('');
      // Refetch the comments after successful submission
      fetchComments(id).then(setComments);
    } catch (err) {
      setErrorComment('Failed to post the comment. Please try again.');
    }
  };

  // Handle like button click
  const handleLikeClick = async (commentId) => {
    if (!accessToken) {
      setErrorComment('You must be logged in to like a comment.');
      router.push("/account/login");
      return;
    }

    try {
      const result = await likeComment(commentId, accessToken);
      // Update the comments with the new like count
      setComments(comments.map(comment => 
        comment.id === commentId ? { ...comment, likes: result.like_count } : comment
      ));
    } catch (err) {
      setErrorComment('Failed to like the comment. Please try again.');
      router.push("/account/login");
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim() || commentIdForReply === null) return;

    if (!accessToken) {
      setErrorReply('You must be logged in to post a reply.');
      router.push("/account/login");
      return;
    }

    try {
      await postReply(commentIdForReply, newReply, accessToken);
      setNewReply('');
      setCommentIdForReply(null);
      // Refetch the comments after successful submission
      fetchComments(id).then(setComments);
    } catch (err) {
      setErrorReply('Failed to post the reply. Please try again.');
      router.push("/account/login");
    }
  };

  if (error) {
    return <p>Error loading blog post: {error}</p>;
  }

  if (!blogPost) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  // Filter and shuffle posts for "More Blogs" section
  const filteredAndShuffledPosts = shuffleArray(
    allBlogPosts.filter((post) => post.id !== blogPost.id)
  ).slice(0, 2); // Limit to 2 random blog posts

  return (
    <div className="flex mx-80 mt-10">
      {/* Main Blog Content */}
      <div className="w-8/12 pr-8">
        <h1 className="text-3xl font-bold">{blogPost.title}</h1>
        <div className='flex align-middle mt-2 mb-2 text-teal-500 text-md font-semibold'>                  <Image
                    src={author} // Replace with actual avatar
                    alt={blogPost.author.username}
                    width={30}
                    height={30}
                    className="rounded-full"
                  /><h3 className='mx-2 mt-1'>{blogPost.author}</h3>
          </div>
        {blogPost.main_image && (
          <img
            src={blogPost.main_image}
            alt={blogPost.title}
            className="my-4 w-full h-auto object-cover"
          />
        )}
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: blogPost.long_description }}
        />

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold">Comments</h3>

          {/* Display existing comments */}
          {comments.length === 0 ? (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="mt-4 p-4 bg-gray-100 rounded-md">
                <p className="font-semibold">{comment.user}:</p>
                <p>{comment.content}</p>
                <button
                  onClick={() => handleLikeClick(comment.id)}
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded-md"
                >
                  Like ({comment.likes.length})
                </button>
                <button
                  onClick={() => setCommentIdForReply(comment.id)}
                  className="ml-2 bg-green-500 text-white py-1 px-3 rounded-md"
                >
                  Reply
                </button>
                {commentIdForReply === comment.id && (
                  <form onSubmit={handleReplySubmit} className="mt-2">
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Write your reply here..."
                    />
                    <button
                      type="submit"
                      className="mt-2 bg-green-500 text-white py-1 px-3 rounded-md"
                    >
                      Submit Reply
                    </button>
                  </form>
                )}
                  {/* Replies Section */}
                  <div className="mt-4">
                    {comment.replies && comment.replies.length > 0 ? (
                      comment.replies.map((reply) => (
                        <div key={reply.id} className="p-4 mt-2 bg-gray-200 rounded-md ml-4">
                          <p className="font-semibold">{reply.user}:</p>  {/* Display the user */}
                          <p>{reply.content}</p>  {/* Display the content */}
                        </div>
                      ))
                    ) : (
                      <p>No replies yet.</p>
                    )}
                  </div>


              </div>
            ))
          )}

          {/* Error message for comments */}
          {errorComment && (
            <p className="text-red-500 mt-2">{errorComment}</p>
          )}

          {/* New comment form */}
          <form onSubmit={handleCommentSubmit} className="mt-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Write your comment here..."
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md"
            >
              Post Comment
            </button>
          </form>
          {errorComment && (
            <p className="text-red-500 mt-2">{errorComment}</p>
          )}
        </div>
      </div>

      {/* More Blogs Section */}
      <div className="w-4/12 pl-8">
        <h3 className="text-xl font-bold">More Blogs</h3>

          {filteredAndShuffledPosts.map((post) => (
            


              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow mb-3 mt-8">
                  <a href="#">
                  {post.main_image && (
                        <img
                          src={post.main_image}
                          alt={post.title}
                          className="rounded-t-lg w-full h-auto object-cover"
                        />
                      )}
                  </a>
                  <div class="p-5">
                      <a href="#">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title}</h5>
                      </a>
                      <p class="mb-3 font-normal line-clamp-3 text-gray-700 dark:text-gray-400">{post.short_description}</p>
                      <button               
                          key={post.id}
                          onClick={() => handleBlogClick(post.id)}
                          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Read more
                          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                          </svg>
                      </button>
                  </div>
              </div>



          ))}

      </div>
    </div>
  );
}


