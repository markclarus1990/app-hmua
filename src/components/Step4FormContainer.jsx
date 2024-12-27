// src/components/Step4FormContainer.jsx
import React, { useState } from "react";
import ServiceSelectionForm from "./ServiceSelectionForm";
import SubmitButton from "./SubmitButton";
import BUTTON from "../ui/BUTTON";
import { useFormContext } from "../contexts/FormContext";

const Step4FormContainer = () => {
  const [services, setServices] = useState({
    athena: false,
    hera: false,
    aphrodite: false,
  });
  const { NS, PS } = useFormContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BUTTON form={"packageType"} />
      <ServiceSelectionForm services={services} setServices={setServices} />
    </form>
  );
};

export default Step4FormContainer;
