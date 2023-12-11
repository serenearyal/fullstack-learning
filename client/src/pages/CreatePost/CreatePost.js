import React from "react";
import "./CreatePost.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const initialValues = { title: "", postText: "", username: "" };
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      console.log("Added to database!");
      navigate("/");
    });
  };
  return (
    <div className="CreatePost">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field id="inputCreatePost" name="title" placeholder="Title..." />

          <label>Description: </label>
          <ErrorMessage name="postText" component="span" />
          <Field id="inputCreatePost" name="postText" placeholder="Title..." />

          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field id="inputCreatePost" name="username" placeholder="Title..." />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
