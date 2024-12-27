// src/components/Step3FormContainer.jsx
import React, { useState } from "react";
import CoupleDetailsForm from "./CoupleDetailsForm";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { useFormContext } from "../contexts/FormContext";
import BUTTON from "../ui/BUTTON";

const Step3FormContainer = () => {
  const { setStep3Data, step3 } = useFormContext();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { NS, PS, currentStep } = useFormContext();

  // On form submission
  const onSubmit = (data) => {
    console.log(data);
    setStep3Data(data);
    console.log("FROM CONTEXT", step3);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <CoupleDetailsForm register={register} />
      <BUTTON form={"ServiceSelectionForm"} />
    </form>
  );
};

export default Step3FormContainer;
