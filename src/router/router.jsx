import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../components/MainLayout/MainLayout";
import AllTask from "../components/Pages/AllTask";
import Today from "../components/Pages/Today";
import Upcoming from "../components/Pages/Upcoming";
import Progress from "../components/Pages/Progress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
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
      {
        path: "/progress",
        element: <Progress></Progress>,
      },
    ],
  },
]);
export default router;
