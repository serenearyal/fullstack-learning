import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div id="Login">
      <input
        type="text"
        onChange={(event) => {
          SetUsername(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event) => {
          SetPassword(event.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
