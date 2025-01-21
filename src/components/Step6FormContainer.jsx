import React, { useState } from "react";
import PremiumPackagesDetails from "./PremiumPackagesDetails";
import LimitedOfferPackagesDetails from "./LimitedOfferPackagesDetails";
import AdditionalHeadsForm from "./AdditionalHeadsForm";
import { useForm } from "react-hook-form";
import { useFormContext } from "../contexts/FormContext";
import { useNavigate } from "react-router-dom";
import { getPrice } from "../services/price";
import { useQuery } from "@tanstack/react-query";

const Step6FormContainer = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isPackageSelected, setIsPackageSelected] = useState(false);

  // This function is called when a package is selected
  function handlePackageSelection(packageType) {
    setSelectedPackage(packageType); // Set the selected package
    setIsPackageSelected(true); // Proceed to the next step
    console.log(packageType); // Log for debugging
  }

  const [pack, setPack] = useState("");
  const { setStep6Data, step6, setlimited, setAdditional } = useFormContext();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { NS, PS, currentStep } = useFormContext();
  const navigate = useNavigate();

  // On form submission
  const onSubmit = (data) => {
    console.log("selected", data);

    setStep6Data(data);
    console.log("FROM CONTEXT", step6);
  };

  function handleClick(data) {
    console.log(data);
    setPack(data);
  }

  // Fetching pricing data
  const {
    isLoading,
    data: pricing = [], // Default to an empty array if no data is fetched
    error,
  } = useQuery({
    queryKey: ["pricing"],
    queryFn: getPrice,
  });

  // Logging the pricing data for debugging
  console.log(pricing);

  if (isLoading) {
    return <div>Loading pricing data...</div>; // Display a loading message while data is being fetched
  }

  if (error) {
    return <div>Error fetching pricing: {error.message}</div>; // Display an error message if the query fails
  }

  return (
    <>
      {/* {!isPackageSelected && (
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-white bg-peach-600 rounded-lg hover:bg-peach-500 transition mb-2"
        >
          Previous
        </button>
      )} */}

      <div className="flex flex-col py-10 mt-7 px-2 gap-3 bg-peach-300 w-[500px] mx-auto my-auto rounded-lg  xs:w-[300px] mt-[1px] sm:w-[500px] md:w-[800px] opacity-[0.8]">
        {!isPackageSelected ? (
          // This is the step where the user selects a package
          <div className="space-y-6">
            {/* <h2 className="text-2xl font-semibold text-peach-700">
              Choose Package Type
            </h2> */}

            <p className="text-lg text-slate-900">
              Please choose between the Premium Packages or the Limited Offer
              Packages.
            </p>

            {/* Pass the handlePackageSelection function to both child components */}
            <div className="flex justify-center gap-10 items-center">
              <button
                onClick={() => handleClick("premium")}
                className="px-6 py-2 text-white bg-peach-900 rounded-lg hover:bg-peach-700 transition bg-peach-600"
              >
                Premium
              </button>
              <button
                onClick={() => handleClick("limited")}
                className="px-6 py-2 text-white bg-peach-900 rounded-lg hover:bg-peach-700 transition bg-peach-600"
              >
                Limited Offers
              </button>
            </div>

            {pack === "premium" ? (
              <PremiumPackagesDetails
                onSelectPackage={onSubmit}
                setIsPackageSelected={setIsPackageSelected}
                pricing={pricing} // Pass pricing data to the component
              />
            ) : (
              ""
            )}

            {pack === "limited" ? (
              <LimitedOfferPackagesDetails
                onSelectPackage={onSubmit}
                setIsPackageSelected={setIsPackageSelected}
                pricing={pricing} // Pass pricing data to the component
                setlimited={setlimited}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          // This is the next step where the AdditionalHeadsForm is shown
          <AdditionalHeadsForm
            packageType={selectedPackage}
            pricing={pricing}
          />
        )}
      </div>
    </>
  );
};

export default Step6FormContainer;
