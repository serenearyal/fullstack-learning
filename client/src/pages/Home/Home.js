import React from "react";
import axios from "axios";
import "./Home.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [listOfPosts, setListsOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListsOfPosts(response.data);
    });
  });
  return (
    <div className="Home">
      {listOfPosts.map((value, key) => {
        return (
          <div className="post">
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
