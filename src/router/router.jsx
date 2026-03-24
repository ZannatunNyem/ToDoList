import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../components/MainLayout/MainLayout";
import Home from "../components/Home/Home";
import AllTask from "../components/Pages/AllTask";
import Today from "../components/Pages/Today";
import Upcoming from "../components/Pages/Upcoming";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/allTask",
        element: <AllTask></AllTask>,
      },
      {
        path: "/today",
        element: <Today></Today>,
      },
      {
        path: "/upcoming",
        element: <Upcoming></Upcoming>,
      },
    ],
  },
]);
export default router;
