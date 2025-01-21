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
    <div className="flex flex-col py-10 px-2 gap-3 bg-peach-300 w-[500px] mx-auto my-auto rounded-lg mt-4 xs:w-[300px] mt-[100px] sm:w-[500px] md:w-[800px] opacity-[0.8]">
      <h2 className="text-2xl font-semibold text-pink-700 text-center">
        Choose you desired package on the next page.
      </h2>
    </div>
  );
};

export default ServiceSelectionForm;
