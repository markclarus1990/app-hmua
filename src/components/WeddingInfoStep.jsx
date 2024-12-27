import { useState } from "react";

const WeddingInfoStep = () => {
  const [weddingInfo, setWeddingInfo] = useState({
    weddingDate: "2024-06-22",
    hmuaArrival: "06:00",
    hmuaStart: "06:30",
    ceremonyStart: "14:30",
    ceremonyVenue: "SADP Silang",
    prepVenue: "TBF (possible sa Abagatan)",
    receptionVenue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeddingInfo({
      ...weddingInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Wedding Info Submitted:", weddingInfo);
    // In future steps, you'd move to the next step or store the data
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Wedding Information
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Wedding Date */}
          <div>
            <label className="block text-gray-700">Wedding Date</label>
            <input
              type="date"
              name="weddingDate"
              value={weddingInfo.weddingDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          {/* HMUA Team Arrival */}
          <div>
            <label className="block text-gray-700">HMUA Team Arrival</label>
            <input
              type="time"
              name="hmuaArrival"
              value={weddingInfo.hmuaArrival}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          {/* HMU Start Time */}
          <div>
            <label className="block text-gray-700">HMU Start Time</label>
            <input
              type="time"
              name="hmuaStart"
              value={weddingInfo.hmuaStart}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          {/* Ceremony Start Time */}
          <div>
            <label className="block text-gray-700">Ceremony Start Time</label>
            <input
              type="time"
              name="ceremonyStart"
              value={weddingInfo.ceremonyStart}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          {/* Ceremony Venue */}
          <div>
            <label className="block text-gray-700">Ceremony Venue</label>
            <input
              type="text"
              name="ceremonyVenue"
              value={weddingInfo.ceremonyVenue}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          {/* Prep Venue */}
          <div>
            <label className="block text-gray-700">Prep Venue</label>
            <input
              type="text"
              name="prepVenue"
              value={weddingInfo.prepVenue}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          {/* Reception Venue */}
          <div>
            <label className="block text-gray-700">Reception Venue</label>
            <input
              type="text"
              name="receptionVenue"
              value={weddingInfo.receptionVenue}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 mt-6"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeddingInfoStep;
