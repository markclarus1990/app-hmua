// src/components/CoupleDetailsForm.jsx
import React, { useState } from "react";

const CoupleDetailsForm = ({ register }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-700">
        Couple’s Details
      </h2>
      <div className="text-black">
        <div>
          <label
            htmlFor="clientName"
            className="block text-lg font-semibold text-purple-600"
          >
            Client’s Name
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            {...register("clientName")}
            className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter client’s name"
          />
        </div>

        <div>
          <label
            htmlFor="contactNumber"
            className="block text-lg font-semibold text-purple-600"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            {...register("contactNumber")}
            className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter contact number"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-purple-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email")}
            className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label
            htmlFor="socialMedia"
            className="block text-lg font-semibold text-purple-600"
          >
            Facebook | Instagram Handle
          </label>
          <input
            type="text"
            id="socialMedia"
            name="socialMedia"
            {...register("socialMedia")}
            className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter Facebook or Instagram handle"
          />
        </div>
      </div>
    </div>
  );
};

export default CoupleDetailsForm;
