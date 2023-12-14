import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

const Login = () => {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
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
