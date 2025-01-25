import React from "react";

const Buttons = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Buttons;
