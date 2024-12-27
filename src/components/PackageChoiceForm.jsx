// src/components/PackageChoiceForm.jsx
import React from "react";

const PackageChoiceForm = ({ setPackageType }) => {
  const handlePackageChoice = (choice) => {
    setPackageType(choice); // Set the selected package type in the parent state
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-700">
        Choose Package Type
      </h2>
      <p className="text-lg text-purple-600">
        Please choose between the Premium Packages or the Limited Offer
        Packages.
      </p>

      <div className="space-y-4 mt-4">
        <button
          onClick={() => handlePackageChoice("premium")}
          className="w-full px-6 py-3 bg-pink-600 text-white text-lg rounded-lg hover:bg-pink-700 transition"
        >
          Premium Packages
        </button>
        <button
          onClick={() => handlePackageChoice("limited")}
          className="w-full px-6 py-3 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition"
        >
          Limited Offer Packages
        </button>
      </div>
    </div>
  );
};

export default PackageChoiceForm;
