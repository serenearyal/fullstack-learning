import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const initialValues = { username: "", password: "" };
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(6).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log("Added to database!");
      navigate("/");
    });
  };
  return (
    <div className="Registration">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field name="username" placeholder="Username" />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field type="password" name="password" placeholder="Password" />

          <button type="submit">Sign Up!</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
