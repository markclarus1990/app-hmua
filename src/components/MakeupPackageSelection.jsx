// src/components/MakeupPackageSelection.jsx
import React from "react";

const MakeupPackageSelection = ({ selectedPackage, setSelectedPackage }) => {
  return (
    <div className="flex flex-col py-10 px-2 gap-3 bg-peach-300 w-[500px] mx-auto my-auto rounded-lg mt-4 xs:w-[300px] mt-[100px] sm:w-[500px] opacity-[0.8]  md:w-[800px]">
      {/* <label className="block text-2xl font-semibold text-center mb-10">
        Choose Your Makeup Package
      </label> */}
      <div className="space-y-4 mt-2">
        {/* One-Touch Package Option */}
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="makeupPackage"
            value="wedding"
            checked={selectedPackage === "wedding"}
            onChange={() => setSelectedPackage("wedding")}
            className="text-pink-500 focus:ring-pink-400"
          />
          <span className="text-gray-800">
            <strong className="text-2xl">👰Wedding</strong>
          </span>
        </label>

        {/* 45mins HMU w/ 4hrs Photoshoot Session */}
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="makeupPackage"
            value="45minsHMU"
            disabled={true}
            checked={selectedPackage === "45minsHMU"}
            onChange={() => setSelectedPackage("45minsHMU")}
            className="text-pink-500 focus:ring-pink-400"
          />
          <span className="text-pink-800">
            <strong className="text-2xl">📸 Photoshoot</strong>
          </span>
        </label>

        {/* 45mins HMU w/ 4hrs Photoshoot Session */}
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="walkin"
            value="walkin"
            disabled={true}
            checked={selectedPackage === "walkin"}
            onChange={() => setSelectedPackage("walkin")}
            className="text-pink-500 focus:ring-pink-400"
          />
          <span className="text-pink-800">
            <strong className="text-2xl">👍 Walk-in</strong>
          </span>
        </label>

        {/* 45mins HMU w/ 4hrs Photoshoot Session */}
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="onelook"
            value="onelook"
            disabled={true}
            checked={selectedPackage === "onelook"}
            onChange={() => setSelectedPackage("onelook")}
            className="text-pink-500 focus:ring-pink-400"
          />
          <span className="text-pink-800">
            <strong className="text-2xl">😎 One Look Home Service</strong>
          </span>
        </label>
      </div>

      {/* Details of the selected package */}
      {selectedPackage === "wedding" && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-300 rounded-lg">
          <h1>Thank you for chossing wedding services</h1>
          Discover the packages and exclusive promos that awaits you.
          {/* <ul className="list-disc pl-5 text-pink-700 mt-2">
            <li>One Makeup Look only - Traditional/Airbrush PRO-HD HMU</li>
            <li>No Retouching</li>
            <li>FREE False Lashes</li>
            <li>HMUA TEAM will be off-duty after the session</li>
          </ul> */}
        </div>
      )}

      {selectedPackage === "45minsHMU" && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-300 rounded-lg">
          <h3 className="font-semibold text-pink-700">
            Please contact Grace Sibayan for more info..
          </h3>
          {/* <ul className="list-disc pl-5 text-pink-700 mt-2">
            <li>Pro-HD Airbrush Makeup & Hairstyle</li>
          </ul> */}
        </div>
      )}
      {selectedPackage === "walkin" && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-300 rounded-lg">
          <h3 className="font-semibold text-pink-700">
            Please contact Grace Sibayan for more info..
          </h3>
          {/* <ul className="list-disc pl-5 text-pink-700 mt-2">
            <li>Pro-HD Airbrush Makeup & Hairstyle</li>
          </ul> */}
        </div>
      )}
      {selectedPackage === "onelook" && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-300 rounded-lg">
          <h3 className="font-semibold text-pink-700">
            Please contact Grace Sibayan for more info..
          </h3>
          {/* <ul className="list-disc pl-5 text-pink-700 mt-2">
            <li>Pro-HD Airbrush Makeup & Hairstyle</li>
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default MakeupPackageSelection;
