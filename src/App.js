import * as React from "react";
import Container from "@mui/material/Container";
import Authentication from "./component/Authentication";
import Posts from "./component/Posts";
import Post from "./component/Post";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authentication />}></Route>
            <Route path="/posts" element={<Posts />}></Route>
            <Route path="/post" element={<Post />}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
