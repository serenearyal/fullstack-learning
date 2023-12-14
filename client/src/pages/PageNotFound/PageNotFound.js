import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <h1>
      404 PageNotFound :/ <br></br>Go to
      <Link to="/">Homepage</Link>
    </h1>
  );
};

export default PageNotFound;
