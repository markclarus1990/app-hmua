// src/components/SubmitButton.jsx
import React from "react";

const SubmitButton = () => {
  return (
    <div className="flex justify-center mt-8">
      <button
        type="submit"
        className="px-6 py-3 text-lg font-bold bg-violet-500 text-white rounded-full hover:bg-violet-600 transition-all duration-300"
      >
        Next Step
      </button>
    </div>
  );
};

export default SubmitButton;
