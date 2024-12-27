// src/components/FormContainer.jsx
import React from "react";
import Header from "./Header";
import MakeupPackageSelection from "./MakeupPackageSelection";
import NotesSection from "./NotesSection";
import SubmitButton from "./SubmitButton";

const FormContainer = ({
  selectedPackage,
  setSelectedPackage,
  notes,
  setNotes,
}) => {
  return (
    <div className="max-w-3xl mx-auto bg-white bg-opacity-90 p-6 rounded-xl shadow-lg backdrop-blur-lg">
      <Header />
      <form className="space-y-6">
        <MakeupPackageSelection
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
        />
        <NotesSection notes={notes} setNotes={setNotes} />
      </form>
    </div>
  );
};

export default FormContainer;
