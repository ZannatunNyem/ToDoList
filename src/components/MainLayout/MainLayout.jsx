import React from "react";
import { NavLink, Outlet } from "react-router";
import Leftside from "../Leftside/Leftside";
import Home from "../Home/Home";

export default function MainLayout() {
  return (
    <div>
      <Leftside></Leftside>
    </div>
  );
}
