import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";

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
        setListsOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
              // modifying to refresh like counter without refreshing the whole page
            } else {
              return post;
            }
          })
        );
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListsOfPosts(response.data);
    });
  }, []);
  return (
    <div className="flex flex-col gap-2 m-3 h-screen items-center">
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="flex flex-col w-1/2 border border-opacity-5 border-purple-50 items-center justify-center text-white"
          >
            <div className="post-border">{value.title}</div>
            <div
              className="post-border"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="flex gap-3 post-border p-0 text-purple-100">
              {value.username}
              <label>{value.Likes.length}</label>
              <button
                onClick={() => {
                  likePost(value.id);
                }}
              >
                <AiFillLike />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
