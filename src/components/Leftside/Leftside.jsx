import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  ListTodo,
  Sun,
  Clock3,
  NotebookPen,
  ChartColumn,
  Calendar,
  Plus,
} from "lucide-react";
import Footer from "../Pages/Footer";
import Swal from "sweetalert2";

export default function Leftside() {
  const handleAddTask = () => {
    Swal.fire({
      title: "Add New Task",
      html: `
  <div style="display:flex; flex-direction:column; gap:14px; padding:5px 10px;">

    <!-- Priority Section -->
    <div style="text-align:left; font-size:14px;">
      <p style="margin:0 0 6px; font-weight:600; color:#555;">Priority</p>

      <div style="display:flex; gap:15px;">
        <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
          <input type="radio" name="priority" value="important">
          <span style="color:#bd0000;"> Important</span>
        </label>

        <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
          <input type="radio" name="priority" value="ordinary" checked>
          <span style="color:#0056e2;"> Ordinary</span>
        </label>
      </div>
    </div>

    <!-- Task Input -->
    <input 
      id="taskText" 
      class="swal2-input" 
      placeholder="📝 Enter your task"
      style="margin:0;"
    >

    <!-- Date Input -->
    <input 
      type="date" 
      id="taskDate" 
      class="swal2-input"
      style="margin:0;"
    >

  </div>
`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Task",

      confirmButtonColor: "#3a3df3",
      background: "#f9fafb",
      preConfirm: () => {
        const text = document.getElementById("taskText").value;
        const date = document.getElementById("taskDate").value;
        const priority = document.querySelector(
          'input[name="priority"]:checked',
        ).value;

        if (!text || !date) {
          Swal.showValidationMessage("Please fill all fields");
          return false;
        }

        return { text, date, priority };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // setTask(result.value);
        const { text, date, priority } = result.value;
        const taskData = { text, date, priority, status: "pending" };

        fetch("https://to-do-list-backend-two.vercel.app/allTask", {
          method: "POST",

          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(taskData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            window.location.reload();
          });

        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        }).fire({
          icon: "success",
          title: "Task Added successfully!",
        });
      }
    });
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen ">
        {/*  content  */}

        <div className="navbar bg-base-100 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-2xl font-bold font-serif">
            ToDo List
          </div>

          <div className="hidden flex-none lg:block"></div>
          <button
            onClick={handleAddTask}
            className="btn btn-primary rounded-3xl m-5 pl-2"
          >
            <Plus size={18} />
            Add New Task
          </button>
        </div>
        <div className="flex-1 w-full ">
          <Outlet />
        </div>
        <Footer />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-10">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "bg-base-300 text-white" : ""}`
              }
            >
              <ListTodo size={18} />
              All Task
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/today"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "bg-base-300 text-white" : ""}`
              }
            >
              <Sun size={18} />
              Today
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "bg-base-300 text-white" : ""}`
              }
            >
              <Clock3 size={18} />
              Upcoming
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "bg-base-300 text-white" : ""}`
              }
            >
              <ChartColumn size={18} />
              Progress
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
