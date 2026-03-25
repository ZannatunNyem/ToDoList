import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Today() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/todayTask")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);
  return (
    <div className="ml-10 ">
      <h2 className="text-2xl font-bold mb-4">Today's Tasks</h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Task Description</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            {tasks.map((task) => (
              <tbody key={task._id}>
                {/* row 1 */}
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold">{task.text}</div>
                        {/* <div className="text-sm opacity-50">
                              {task.priority}
                            </div> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${task.priority === "ordinary" ? "badge-ghost" : "badge-info"}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td>{task.date}</td>
                  <td>
                    <span
                      className={`badge ${task.status === "pending" ? "badge-warning" : "badge-success"}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <th>
                    <button className="text-red-600 text-lg cursor-pointer hover:scale-110 transition">
                      <FaTrash />
                    </button>
                  </th>
                </tr>
                {/* row 2 */}
              </tbody>
            ))}
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
}
