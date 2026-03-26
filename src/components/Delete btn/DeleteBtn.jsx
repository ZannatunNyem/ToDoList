import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function DeleteBtn({ id, tasks, setTasks }) {
  // const[tasks,setTasks]=useState([])
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //  if confirmed
        fetch(`https://to-do-list-server-gules.vercel.app/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = tasks.filter((task) => task._id !== id);
              setTasks(remaining);

              Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete task.",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <button
      onClick={handleDelete}
      className="text-red-600 text-lg cursor-pointer hover:scale-110 transition"
    >
      <FaTrash />
    </button>
  );
}
