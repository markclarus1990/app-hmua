import React, { useEffect, useState } from "react";
import SignatureComponent from "./SignatureComponent";
import { getPolicies } from "../services/price";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const POLI = ({ handleBook }) => {
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
      <p className="font-semibold text-peach-600 text-center">
        <strong className="text-peach-600">Policies</strong>
      </p>
      {/* overflow-y-auto */}
      <div className="  mb-1 flex flex-col gap-2">
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

      <div className="mt-1">
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

export default POLI;
