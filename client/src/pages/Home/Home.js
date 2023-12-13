import React from "react";
import axios from "axios";
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [listOfPosts, setListsOfPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListsOfPosts(response.data);
    });
  }, []);
  return (
    <div className="Home">
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="post"
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
            <div className="title">{value.title}</div>
            <div className="postText">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
