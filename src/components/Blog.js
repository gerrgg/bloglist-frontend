import React, { useState } from "react";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);

  return (
    <p className="blog">
      {blog.title} - {blog.author ? blog.author : "No Author"}
      {show ? (
        <BlogDetails blog={blog} setShow={setShow} />
      ) : (
        <button onClick={() => setShow(!show)} style={{ marginLeft: 5 }}>
          View
        </button>
      )}
    </p>
  );
};

const BlogDetails = ({ blog, setShow }) => (
  <div className="details">
    <p>URL: {blog.url}</p>
    <p>Likes: {blog.likes}</p>
    <p>User: {blog.user ? blog.user.username : null}</p>
    <button onClick={() => setShow(false)}>Hide</button>
  </div>
);

export default Blog;
