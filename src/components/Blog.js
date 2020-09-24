import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="blog">
      {blog.title} - {blog.author ? blog.author : "No Author"}
      {show && blog.user ? (
        <BlogDetails
          blog={blog}
          setShow={setShow}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ) : (
        <button onClick={() => setShow(!show)} style={{ marginLeft: 5 }}>
          View
        </button>
      )}
    </div>
  );
};

const BlogDetails = ({ blog, setShow, handleLike, handleDelete, user }) => (
  <div className="details">
    <p>URL: {blog.url}</p>
    <p>
      Likes: {blog.likes}
      <button onClick={() => handleLike(blog)}>Like</button>
    </p>
    <p>User: {blog.user ? blog.user.username : null}</p>
    <button onClick={() => setShow(false)}>Hide</button>
    {blog.user.id === user.id ? (
      <button onClick={() => handleDelete(blog.id)}>Delete</button>
    ) : null}
  </div>
);

export default Blog;
