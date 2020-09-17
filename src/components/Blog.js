import React from "react";

const Blog = ({ blog }) => {
  return (
    <p>
      {blog.title} - {blog.author ? blog.author : "No Author"}
    </p>
  );
};

export default Blog;
