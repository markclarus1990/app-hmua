import React, { useEffect, useState } from "react";
import SignatureComponent from "./SignatureComponent";
import { getPolicies } from "../services/price";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FormProvider, useFormContext } from "react-hook-form";

const ContractComponent = ({ handleBook }) => {
  const [accepted, setAccepted] = useState(false);

  // Function to handle the saved signature
  const handleSignatureSave = (compressedSignature) => {
    // setSignature(compressedSignature);
  };

  const toggleAccept = () => {
    setAccepted(!accepted);
  };
  const {
    isLoading,
    data: policies = [],
    error,
  } = useQuery({
    queryKey: ["policies"],
    queryFn: getPolicies,
  });

  useEffect(
    function () {
      console.log("POLICIES", policies);
    },
    [policies]
  );

  return (
    <div className="p-6 font-sans bg-white">
      <h2 className="text-2xl font-bold mb-4 text-peach-600 text-center">
        Wedding Makeup Artist Contract
      </h2>
      <p className="font-semibold text-peach-600 text-center">
        <strong className="text-peach-600">Policies</strong>
      </p>
      <div className="max-h-[300px] overflow-y-auto mb-4 flex flex-col gap-2">
        {policies.map((policy) => (
          <div key={policy.policies_id}>
            <h3 className="text-xl font-semibold text-peach-600">
              {policy.section}
            </h3>
            <p
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: policy.description }} // Renders HTML content
            />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-peach-600">
          Details of Service(s) Chosen
        </h3>
        <p className="mb-2">
          <strong>Inclusions:</strong> 10 pax Adult Ladies: PRO-HD Traditional
          Makeup & Hairstyle w/ Free False Lashes...
        </p>
        <p className="mb-4">
          <strong>Assigned Team:</strong> TBA
        </p>
        <h3 className="text-xl font-semibold text-peach-600">Re-scheduling:</h3>
        <p>₱ 2,000.00 non-deductible fee applies...</p>
      </div>

      <div className="mt-4">
        <label className="flex items-center space-x-2 text-peach-400">
          <input
            type="checkbox"
            checked={accepted}
            onChange={toggleAccept}
            className="h-5 w-5"
          />
          <span>
            I agree to the terms and conditions outlined in the contract.
          </span>
        </label>
      </div>

      {/* Signature Component */}
      <div className="mt-6">
        <SignatureComponent
          accepted={accepted}
          onSave={handleSignatureSave}
          handleBook={handleBook}
        />
      </div>
    </div>
  );
};

export default ContractComponent;
