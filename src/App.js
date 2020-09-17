import React, { useState, useEffect } from "react";
import "./App.scss";

// components
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

// services
import blogService from "./services/blogs";
import loginService from "./services/login";

// GO!
function App() {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );

  const blogForm = () => <p>Blog form here</p>;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotificationMessage("Invalid username/password combination");
      setNotificationClass("error");

      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification
        notificationMessage={notificationMessage}
        notificationClass={notificationClass}
      />

      {user === null ? loginForm() : blogForm()}

      <h3>Blogs</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
