import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";
import axios from "axios";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  });
  return (
    <div className="Post">
      <div className="leftSide">
        <div>{postObject.title}</div>
        <div>{postObject.postText}</div>
        <div>{postObject.username}</div>
      </div>
      <div className="rightSide">COMMENT SECTION</div>
    </div>
  );
};

export default Post;
