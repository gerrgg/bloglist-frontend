import React from "react";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form id="loginForm" onSubmit={handleLogin}>
    <h1>Login</h1>
    <p>
      Username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </p>
    <p>
      Password
      <input
        type="text"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </p>
    <button type="submit">login</button>
  </form>
);

export default LoginForm;
