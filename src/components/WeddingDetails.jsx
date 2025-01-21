// src/components/WeddingDetails.jsx
import React from "react";

const WeddingDetails = ({ register }) => {
  return (
    <div className="flex flex-col py-10 px-2 gap-3 bg-peach-300 w-[500px] mx-auto my-auto rounded-lg mt-4 xs:w-[300px] mt-[100px] sm:w-[500px] md:w-[800px] opacity-[0.8]">
      <div className="text-center">
        <label
          htmlFor="weddingDate"
          className="block text-lg font-semibold text-pink-700"
        >
          Wedding Date
        </label>
        <input
          type="date"
          id="weddingDate"
          {...register("weddingDate", { required: true })}
          className="w-full text-center p-3 mt-2 rounded-lg bg-white text-pink-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* <div>
        <label
          htmlFor="hmuArrival"
          className="block text-lg font-semibold text-pink-700"
        >
          HMUA Team Arrival
        </label>
        <input
          type="time"
          id="hmuArrival"
          {...register("hmuArrival", { required: true })}
          className="w-full text-center p-3 mt-2 rounded-lg bg-white text-pink-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div>
        <label
          htmlFor="hmuStart"
          className="block text-lg font-semibold text-pink-700"
        >
          HMU Start Time
        </label>
        <input
          type="time"
          id="hmuStart"
          {...register("hmuStart", { required: true })}
          className="w-full text-center p-3 mt-2 rounded-lg bg-white text-pink-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div> */}

      <div>
        <label
          htmlFor="ceremonyStart"
          className="block text-lg font-semibold text-pink-700"
        >
          Ceremony Start Time
        </label>
        <input
          type="time"
          id="ceremonyStart"
          {...register("ceremonyStart", { required: true })}
          className="w-full text-center p-3 mt-2 rounded-lg bg-white text-pink-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div>
        <label
          htmlFor="ceremonyVenue"
          className="block text-lg font-semibold text-pink-700"
        >
          Ceremony Venue
        </label>
        <input
          type="text"
          id="ceremonyVenue"
          {...register("ceremonyVenue", { required: true })}
          className="w-full text-center p-3 mt-2 rounded-lg bg-white text-pink-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="e.g., SADP Silang"
        />
      </div>

      <div>
        <label
          htmlFor="prepVenue"
          className="block text-lg font-semibold text-pink-700"
        >
          Prep Venue
        </label>
        <input
          type="text"
          id="prepVenue"
          {...register("prepVenue", { required: true })}
          className="w-full text-center p-3 mt-2 rounded-lg bg-white text-pink-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="e.g., TBF (possible at Abagatan)"
        />
      </div>

      <div>
        <label
          htmlFor="receptionVenue"
          className="block text-lg font-semibold text-pink-700"
        >
          Reception Venue
        </label>
        <input
          type="text"
          id="receptionVenue"
          {...register("receptionVenue", { required: true })}
          className="w-full text-center p-3 mt-2 rounded-lg bg-white text-pink-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Enter Reception Venue"
        />
      </div>
    </div>
  );
};

export default WeddingDetails;
