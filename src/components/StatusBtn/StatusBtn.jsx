import React from "react";

export default function StatusBtn({ task, reload, setReload }) {
  const handleStatus = () => {
    const newStatus = task.status === "pending" ? "finished" : "pending";

    fetch(
      `https://to-do-list-server-gules.vercel.app/updateStatus/${task._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      },
    )
      .then((res) => res.json())
      .then(() => setReload(!reload));
  };

  return (
    <button
      onClick={handleStatus}
      className={`btn btn-sm ${
        task.status === "pending"
          ? "btn-warning"
          : "bg-[#5EBB2B] text-white border-none"
      }`}
    >
      {task.status}
    </button>
  );
}
