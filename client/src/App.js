import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreatePost from "./pages/CreatePost/CreatePost";
import Post from "./pages/Post/Post";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">Homepage</Link>
        <Link to="/createpost">Create a Post</Link>
        <Link to="/login">Create a Post</Link>
        <Link to="/registration">Create a Post</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
