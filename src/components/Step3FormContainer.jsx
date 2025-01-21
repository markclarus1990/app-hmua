import React, { useState } from "react";
import CoupleDetailsForm from "./CoupleDetailsForm";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { useFormContext } from "../contexts/FormContext";
import BUTTON from "../ui/BUTTON";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Step3FormContainer = () => {
  const { setStep3Data, step3 } = useFormContext();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { NS, PS, currentStep } = useFormContext();
  const navigate = useNavigate(); // To handle navigation

  // On form submission
  let isAnyFieldBlank;
  const onSubmit = (data) => {
    console.log(data);

    // Check if any field is blank
    isAnyFieldBlank = Object.values(data).some(
      (value) => value === "" || value === null || value === undefined
    );

    if (isAnyFieldBlank) {
      toast.error("Please fill in all the fields.");
      return; // Don't proceed if fields are missing
    }

    setStep3Data(data); // Set data in context
    console.log("FROM CONTEXT", step3);

    // If all fields are filled, proceed to the next step
    navigate("/ServiceSelectionForm"); // Adjust the path if necessary
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <CoupleDetailsForm register={register} />
      <BUTTON
        form={isAnyFieldBlank ? "ServiceSelectionForm" : "CoupleDetailsForm"}
      />
    </form>
  );
};

export default Step3FormContainer;
