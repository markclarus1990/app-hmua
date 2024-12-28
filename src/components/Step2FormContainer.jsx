import React, { useState } from "react";
import MakeupPackageSelection from "./MakeupPackageSelection";
import SubmitButton from "./SubmitButton";
import { useFormContext } from "../contexts/FormContext";
import { useForm } from "react-hook-form";
import BUTTON from "../ui/BUTTON";

const Step2FormContainer = ({ steps }) => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const { setStep2Data, step2 } = useFormContext();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { NS, PS, currentStep } = useFormContext();

  // On form submission
  const onSubmit = (data) => {
    console.log(data);

    // Check if selectedPackage is empty
    if (!selectedPackage) {
      alert("Please select a makeup package.");
      return; // Don't proceed with setting data if no package is selected
    }

    setStep2Data(selectedPackage);
    console.log("FROM CONTEXT", step2);
    console.log("Selected Package:", selectedPackage);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <MakeupPackageSelection
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
      />
      <BUTTON
        form={selectedPackage ? `CoupleDetailsForm` : "PackageSelection"}
      />
    </form>
  );
};

export default Step2FormContainer;
