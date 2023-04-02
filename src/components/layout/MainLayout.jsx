import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../navbar/Navbar";

const MainLayout = (props) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div>
      {pathname == "/login" || pathname == "/register" ? null : <NavBar />}
      {props.children}
    </div>
  );
};

export default MainLayout;
