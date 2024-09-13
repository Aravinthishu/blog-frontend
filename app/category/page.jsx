// app/blog/page.jsx

async function getBlogPosts() {
    const res = await fetch('http://127.0.0.1:8000/blog/blogposts/', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return res.json();
  }
  
  export default async function BlogPage() {
    let blogPosts;
    try {
      blogPosts = await getBlogPosts();
    } catch (error) {
      return <p>Error loading blog posts: {error.message}</p>;
    }
  
    return (
      <div>
        <h1>Blog Posts</h1>
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.short_description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  