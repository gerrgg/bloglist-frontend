import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogForm = ({ blogs, setBlogs, setNotification, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const createdBlog = await blogService.create({
        title,
        author,
        url,
        user,
      });

      setBlogs(blogs.concat(createdBlog));

      setNotification({
        message: `${createdBlog.title} by ${createdBlog.author} created!`,
        type: "success",
      });

      setTimeout(() => {
        setNotification({});
      }, 5000);
    } catch (exception) {
      setNotification({
        message: "Creating blog failed",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <p>
        Title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </p>
      <p>
        Author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </p>
      <p>
        Url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </p>
      <input type="submit" value="Create" />
    </form>
  );
};

export default CreateBlogForm;
