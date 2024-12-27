import React, { useState } from "react";
import PremiumPackagesDetails from "./PremiumPackagesDetails";
import LimitedOfferPackagesDetails from "./LimitedOfferPackagesDetails";
import AdditionalHeadsForm from "./AdditionalHeadsForm";

const Step6FormContainer = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isPackageSelected, setIsPackageSelected] = useState(false);

  // This function is called when a package is selected
  function handlePackageSelection(packageType) {
    setSelectedPackage(packageType); // Set the selected package
    setIsPackageSelected(true); // Proceed to the next step
    console.log(packageType); // Log for debugging
  }

  return (
    <div className="space-y-6">
      {!isPackageSelected ? (
        // This is the step where the user selects a package
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-purple-700">
            Choose Package Type
          </h2>

          <p className="text-lg text-purple-600">
            Please choose between the Premium Packages or the Limited Offer
            Packages.
          </p>

          {/* Pass the handlePackageSelection function to both child components */}
          <PremiumPackagesDetails onSelectPackage={handlePackageSelection} />
          <LimitedOfferPackagesDetails
            onSelectPackage={handlePackageSelection}
          />
        </div>
      ) : (
        // This is the next step where the AdditionalHeadsForm is shown
        <AdditionalHeadsForm packageType={selectedPackage} />
      )}
    </div>
  );
};

export default Step6FormContainer;
