import { useState } from "react";

const LimitedOfferPackagesDetails = ({
  onSelectPackage,
  setIsPackageSelected,
  pricing,
  setlimited,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pax, setPax] = useState("");
  const [error, setError] = useState("");

  function handleClick() {
    setIsModalOpen(true);
  }

  function handlePaxChange(event) {
    const value = parseInt(event.target.value, 10);
    if (value > 8) {
      setError("Number of pax is limited to 8.");
    } else if (value <= 0 || isNaN(value)) {
      setError("Please enter a valid number of pax.");
    } else {
      setError("");
    }
    setPax(event.target.value);
  }

  function handleConfirm() {
    if (pax > 0 && pax <= 8) {
      onSelectPackage("Exclusive Offer");
      setlimited(Number(pax));
      setIsPackageSelected(true);
      setIsModalOpen(false);
    } else {
      setError("Please enter a valid number of pax (1-8).");
    }
  }

  function convert(price) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  }

  const limited = pricing?.find((item) => item.name === "Exclusive Offer");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-700">
        Limited Offer Packages (Seasonal)
      </h2>

      {/* Package Card */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 cursor-pointer hover:shadow-xl"
        onClick={handleClick}
      >
        <h3 className="text-xl font-bold text-purple-600">
          EXCLUSIVE OFFER:{" "}
          <span className="text-red-600">{convert(limited?.price)}</span> per
          head
        </h3>
        <ul className="list-none pl-5 text-lg text-purple-600">
          <li className="text-gray-700">
            Before: <span className="line-through text-red-400">4,500.00</span>{" "}
            per head
          </li>
          <li>PRO-HD Traditional Makeup & Hairstyle w/ Free False Lashes</li>
          <li>Minimum of 8 pax heads</li>
          <li>NO TRANSPO FEE & NO EARLY CALL TIME FEE</li>
          <li>More details will be discussed & declared on the 2nd page.</li>
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/2">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">
              Enter Number of Pax
            </h2>
            <input
              type="number"
              value={pax}
              onChange={handlePaxChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Enter number of pax (max 8)"
              max="8"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                disabled={!!error || !pax}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LimitedOfferPackagesDetails;
