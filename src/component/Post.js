import * as React from "react";
import { useEffect } from "react";
import Editor from "./Editor";
import { useNavigate, useLocation } from "react-router-dom";

function Post() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name } = state;

  console.log(name);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      navigate("/");
    }
  }, [navigate]);

  return <Editor />;
}

export default Post;
