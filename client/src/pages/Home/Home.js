import React from "react";
import axios from "axios";
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [listOfPosts, setListsOfPosts] = useState([]);
  const navigate = useNavigate();

  const likePost = (postId) => {
    axios
      .post(
        `http://localhost:3001/likes`,
        { PostId: postId },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListsOfPosts(response.data);
    });
  }, []);
  return (
    <div className="Home">
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div
              className="postText"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              {value.username}
              <button
                onClick={() => {
                  likePost(value.id);
                }}
              >
                Like
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
