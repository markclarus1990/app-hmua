import React, { useState } from "react";
import Toast from "./Toast";

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 space-y-3 max-w-xs z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      {/* For testing purposes */}
      <button
        className="bg-green-500 text-white p-2 rounded-md"
        onClick={() => addToast("Success! Operation completed.", "success")}
      >
        Show Success
      </button>
      <button
        className="bg-red-500 text-white p-2 rounded-md"
        onClick={() => addToast("Error! Something went wrong.", "error")}
      >
        Show Error
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => addToast("Info! Please check the details.", "info")}
      >
        Show Info
      </button>
    </div>
  );
};

export default ToastContainer;
