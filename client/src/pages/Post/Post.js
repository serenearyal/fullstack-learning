import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setComments([
            ...comments,
            { commentBody: newComment, username: response.data.username },
          ]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <div className="Post">
      <div className="leftSide">
        <div>{postObject.title}</div>
        <div>{postObject.postText}</div>
        <div>{postObject.username}</div>
      </div>
      <div className="rightSide">
        <div className="addComment">
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          ></input>
          <button onClick={addComment}>Add Comment</button>
        </div>

        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key}>
                {comment.commentBody}
                <label>{" : " + comment.username}</label>
                {/* {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
