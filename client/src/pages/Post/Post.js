import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";
import axios from "axios";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  return (
    <div className="Post">
      <div className="leftSide">
        <div>{postObject.title}</div>
        <div>{postObject.postText}</div>
        <div>{postObject.username}</div>
      </div>
      <div className="rightSide">
        <div className="addComment">
          <input type="text" placeholder="Write your comment..."></input>
          <button>Add Comment</button>
        </div>

        <div className="listOfComments">
          {comments.map((comment, key) => {
            return <div key={key}>{comment.commentBody}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
