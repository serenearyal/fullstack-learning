import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreatePost from "./pages/CreatePost/CreatePost";
import Post from "./pages/Post/Post";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import "./index.css";

export default function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);
  return (
    <div className="bg-gray-900">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav className="flex justify-between bg-gray-900">
            <div className="p-4">
              <Link
                className="font-serif font-extrabold text-3xl italic text-purple-400 "
                to="/"
              >
                DUMP
              </Link>
            </div>
            <div className="flex gap-4 p-4 text-white">
              <Link className="btn-primary" to="/">
                Homepage
              </Link>
              <Link className="btn-primary" to="/createpost">
                Create a Post
              </Link>
              {!authState.status ? (
                <>
                  <Link className="btn-primary" to="/login">
                    Login
                  </Link>
                  <Link className="btn-primary" to="/registration">
                    Registration
                  </Link>
                </>
              ) : (
                <button className="btn-primary" onClick={logout}>
                  Logout
                </button>
              )}
              <h4>{authState.username}</h4>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}
