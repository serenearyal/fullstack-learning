import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        console.log("Logged in!");
        navigate("/");
      }
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
