"use client";
import React from "react";

export default function DMsPage() {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-slate-800">DM List</div>
      <div className="flex-1 bg-slate-700">
        <p className="p-4">Select a DM to start chatting</p>
      </div>
    </div>
  );
}
