// src/components/MakeupPackageSelection.jsx
import React from "react";

const MakeupPackageSelection = ({ selectedPackage, setSelectedPackage }) => {
  return (
    <div className="mt-20">
      <label className="block text-2xl font-semibold text-center mb-10">
        Choose Your Makeup Package
      </label>
      <div className="space-y-4 mt-2">
        {/* One-Touch Package Option */}
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="makeupPackage"
            value="oneTouch"
            checked={selectedPackage === "oneTouch"}
            onChange={() => setSelectedPackage("oneTouch")}
            className="text-pink-500 focus:ring-pink-400"
          />
          <span className="text-gray-800">
            <strong>One-Touch Package</strong>
          </span>
        </label>

        {/* 45mins HMU w/ 4hrs Photoshoot Session */}
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="makeupPackage"
            value="45minsHMU"
            checked={selectedPackage === "45minsHMU"}
            onChange={() => setSelectedPackage("45minsHMU")}
            className="text-pink-500 focus:ring-pink-400"
          />
          <span className="text-purple-800">
            <strong>45mins HMU w/ 4hrs Photoshoot Session</strong>
          </span>
        </label>
      </div>

      {/* Details of the selected package */}
      {selectedPackage === "oneTouch" && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-300 rounded-lg">
          <h3 className="font-semibold text-purple-700">
            One-Touch Package Details
          </h3>
          <ul className="list-disc pl-5 text-purple-700 mt-2">
            <li>One Makeup Look only - Traditional/Airbrush PRO-HD HMU</li>
            <li>No Retouching</li>
            <li>FREE False Lashes</li>
            <li>HMUA TEAM will be off-duty after the session</li>
          </ul>
        </div>
      )}

      {selectedPackage === "45minsHMU" && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-300 rounded-lg">
          <h3 className="font-semibold text-purple-700">
            45mins HMU w/ 4hrs Photoshoot Session Details
          </h3>
          <ul className="list-disc pl-5 text-purple-700 mt-2">
            <li>Pro-HD Airbrush Makeup & Hairstyle</li>
            <li>Grooming HMU for Groom</li>
            <li>2-3 Looks & Unlimited Retouching</li>
            <li>Free to borrow Hair Extensions & Hair Accessories</li>
            <li>
              6hrs total allocation (45mins HMU session + 4hrs photoshoot)
            </li>
            <li>500 PHP per hour for extension of service</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MakeupPackageSelection;
