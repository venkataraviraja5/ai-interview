"use client"

import React from "react";

const Modal = ({ isOpen, onClose,data,loading }) => {
  if (!isOpen) return null;

  if(loading) return <div>loading......</div>
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h2 className="text-lg font-bold mb-4">Interview Feedback</h2>

        {/* Modal Content */}
        {loading ? 'Fetching Results........' :<div>{data}</div>}
      </div>
    </div>
  );
};

export default Modal;
