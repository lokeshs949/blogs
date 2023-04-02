import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/authentication/login/LoginPage";
import RegisterPage from "./pages/authentication/register/RegisterPage";
import CreatePostPage from "./pages/createPost/CreatePostPage";
import HomePage from "./pages/homepage/HomePage";
import MyPostPage from "./pages/post/MyPostPage";
import PostPage from "./pages/post/PostPage";
import { deleteLocalStorage, getLocalStorage, setLocalStorage } from "./utils";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    let logged = getLocalStorage("logged");
    setLogged(logged);
    setLoading(false);
  }, []);
  return (
    <MainLayout>
      {loading ? null : (
        <Routes>
          <Route path="/login" Component={LoginPage}></Route>
          <Route path="/register" Component={RegisterPage}></Route>
          <Route path="/home" Component={HomePage}></Route>
          <Route path="/create" Component={CreatePostPage}></Route>
          <Route path="/post" Component={PostPage}></Route>
          <Route path="/my-posts" Component={MyPostPage}></Route>
          <Route
            path="*"
            element={<Navigate to={logged ? "/home" : "/login"} replace />}
          />
        </Routes>
      )}
    </MainLayout>
  );
};

export default App;
