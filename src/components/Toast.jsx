import React, { useEffect, useState } from "react";

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  const toastTypeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`toast flex items-center justify-between p-4 mb-3 rounded-lg shadow-lg ${toastTypeClasses[type]} text-white transition-opacity duration-300`}
    >
      <div className="toast-message">{message}</div>
      <button
        className="toast-close-btn text-2xl font-bold hover:text-yellow-300 focus:outline-none"
        onClick={handleClose}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
