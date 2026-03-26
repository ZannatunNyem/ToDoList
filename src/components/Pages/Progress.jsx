import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import progress from "daisyui/components/progress";

export default function Progress() {
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

  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "finished").length;
  const pending = tasks.filter((task) => task.status === "pending").length;
  const important = tasks.filter(
    (task) => task.priority === "important",
  ).length;
  const ordinary = tasks.filter((task) => task.priority === "ordinary").length;

  const completedPercent = total ? Math.round((completed / total) * 100) : 0;
  const pendingPercent = total ? Math.round((pending / total) * 100) : 0;

  const importantPercent = total ? Math.round((completed / total) * 100) : 0;
  const ordinaryPercent = total ? Math.round((pending / total) * 100) : 0;

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="ml-10">
      <h2 className="text-3xl font-bold mb-6 font-serif">
        Task Progress Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Completed Card */}
        <div className="card bg-green-100 shadow-md p-6 flex flex-col items-center rounded-xl">
          <div
            className="radial-progress text-green-600"
            style={{ "--value": completedPercent }}
            role="progressbar"
          >
            {completedPercent}%
          </div>
          <p className="mt-4 text-lg font-semibold text-green-800">
            Completed Tasks
          </p>
          <p className="text-gray-700">
            {completed} / {total}
          </p>
        </div>

        {/* Pending Card */}
        <div className="card bg-yellow-100 shadow-md p-6 flex flex-col items-center rounded-xl">
          <div
            className="radial-progress text-yellow-600"
            style={{ "--value": pendingPercent }}
            role="progressbar"
          >
            {pendingPercent}%
          </div>
          <p className="mt-4 text-lg font-semibold text-yellow-800">
            Pending Tasks
          </p>
          <p className="text-gray-700">
            {pending} / {total}
          </p>
        </div>

        {/* Total Tasks Card */}
        <div className="card bg-blue-100 shadow-md p-6 flex flex-col items-center rounded-xl space-y-6">
          {/* Important Tasks */}
          <div className="w-full flex flex-col items-center">
            <p className="text-lg font-semibold text-blue-800 mb-2">
              Important Tasks
            </p>
            <p className="mt-1 text-sm text-gray-700">
              {importantPercent}% completed
            </p>
            <progress
              className="progress progress-info w-56"
              value={importantPercent}
              max="100"
            ></progress>
          </div>

          {/* Ordinary Tasks */}
          <div className="w-full flex flex-col items-center">
            <p className="text-lg font-semibold text-blue-800 mb-2">
              Ordinary Tasks
            </p>
            <progress
              className="progress progress-neutral w-56"
              value={ordinaryPercent}
              max="100"
            ></progress>
            <p className="mt-1 text-sm text-gray-700">
              {ordinaryPercent}% completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
