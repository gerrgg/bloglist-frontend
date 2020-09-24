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
        id="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </p>
    <p>
      Password
      <input
        type="text"
        value={password}
        name="Password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </p>
    <button id="loginButton" type="submit">
      login
    </button>
  </form>
);

export default LoginForm;
