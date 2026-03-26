import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    </div>
  );
}
