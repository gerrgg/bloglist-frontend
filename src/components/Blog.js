import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="blog">
      <span>
        {blog.title} - {blog.author ? blog.author : "No Author"}
      </span>
      {show ? (
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

const BlogDetails = ({ blog, setShow, handleLike, handleDelete, user }) => {
  return (
    <div className="details">
      <p className="url">URL: {blog.url}</p>
      <p className="likes">Likes: {blog.likes}</p>
      <button className="likesButton" onClick={() => handleLike(blog)}>
        Like
      </button>
      <p className="user">User: {blog.user ? blog.user.username : null}</p>
      <button className="hide" onClick={() => setShow(false)}>
        Hide
      </button>
      {blog.user.id === user.id ? (
        <button className="delete" onClick={() => handleDelete(blog.id)}>
          Delete
        </button>
      ) : null}
    </div>
  );
};

export default Blog;
