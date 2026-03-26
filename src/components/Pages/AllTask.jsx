import React, { useEffect, useState } from "react";

import DeleteBtn from "../Delete btn/DeleteBtn";
import StatusBtn from "../StatusBtn/StatusBtn";
import Loading from "../Loading/Loading";

export default function AllTask() {
  const [tasks, setTasks] = useState([]);

  //reload
  const [reload, setReload] = useState(false);
  //loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/allTask")
      .then((res) => res.json())
      .then((data) => setTasks(data));
    setLoading(false);
  }, [reload]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="ml-10 ">
      <h2 className="text-3xl font-bold mb-6 font-serif">All Tasks List</h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Task Description</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            {tasks.map((task, index) => (
              <tbody key={task._id}>
                {/* row  */}
                <tr>
                  <th>
                    <div className="text-2xl font-light opacity-50">
                      0{index + 1}
                    </div>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold">{task.text}</div>
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
                    <StatusBtn
                      task={task}
                      reload={reload}
                      setReload={setReload}
                    ></StatusBtn>
                  </td>
                  <th>
                    <DeleteBtn
                      id={task._id}
                      tasks={tasks}
                      setTasks={setTasks}
                    ></DeleteBtn>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
