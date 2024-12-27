// src/components/NotesSection.jsx
import React from "react";

const NotesSection = ({ notes, setNotes }) => {
  return (
    <div>
      <label
        htmlFor="notes"
        className="block text-lg font-semibold text-purple-700"
      >
        Additional Notes
      </label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-3 mt-2 rounded-lg bg-white text-purple-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
        placeholder="Please add any specific requests or notes for the HMUA team"
        rows="4"
      />
    </div>
  );
};

export default NotesSection;
