// src/components/ServiceSelectionForm.jsx
import React from "react";

const ServiceSelectionForm = ({ services, setServices }) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setServices((prevServices) => ({
      ...prevServices,
      [name]: checked,
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-700">
        Choose Your Desired Service/s
      </h2>
      <p className="text-lg text-purple-600">
        Please check all that apply. Please refer to the MENU for the
        RATES/PRICES.
      </p>
    </div>
  );
};

export default ServiceSelectionForm;
