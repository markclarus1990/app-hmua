import React, { useState } from "react";
import BUTTON from "../ui/BUTTON";
import { useForm } from "react-hook-form";
import { useFormContext } from "../contexts/FormContext";
import { useNavigate } from "react-router-dom";

const AdditionalHeadsForm = ({ onNextStep }) => {
  const [additionalHeads, setAdditionalHeads] = useState({
    adult: 0,
    motherRelative: 0,
    ninang: 0,
    groomingHMU: 0,
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalHeads((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setSelectedServices((prevServices) =>
      checked
        ? [...prevServices, name]
        : prevServices.filter((service) => service !== name)
    );
    console.log("selectedServices", selectedServices);
  };

  const handleTransportChange = (e) => {
    const { name, checked } = e.target;
    setSelectedTransport((prevTransport) =>
      checked
        ? [...prevTransport, name]
        : prevTransport.filter((transport) => transport !== name)
    );
    console.log("selectedTransport", selectedTransport);
  };

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { setStep7Data, step7 } = useFormContext();
  let isAnyFieldBlank;
  const onSubmit = (data) => {
    // Check if any field is blank
    isAnyFieldBlank =
      !data.adult || !data.motherRelative || !data.ninang || !data.groomingHMU;

    if (isAnyFieldBlank) {
      alert("Please fill in all the required fields.");
      return; // Prevent form submission if any field is blank
    }

    setStep7Data(data);
    console.log("FROM CONTEXT", step7);
    navigate("/app/summary");
  };

  return (
    <div className="space-y-6 m-0">
      <h2 className="text-2xl font-semibold text-purple-700 m-0">
        Additional Heads and Services
      </h2>

      {/* Additional Heads Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-pink-600">Additional Heads</h3>
          <div className="space-y-4 mt-4 text-purple-700">
            <div>
              <label htmlFor="adult" className="text-lg">
                ADULT (pax x 1,300.00)
              </label>
              <input
                type="number"
                id="adult"
                name="adult"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                min="0"
                {...register("adult")}
              />
            </div>

            <div>
              <label htmlFor="motherRelative" className="text-lg">
                Mother/Sister/Relative
              </label>
              <input
                type="number"
                id="motherRelative"
                name="motherRelative"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                min="0"
                {...register("motherRelative")}
              />
            </div>

            <div>
              <label htmlFor="ninang" className="text-lg">
                Ninang
              </label>
              <input
                type="number"
                id="ninang"
                name="ninang"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                min="0"
                {...register("ninang")}
              />
            </div>

            <div>
              <label htmlFor="groomingHMU" className="text-lg">
                Grooming HMU
              </label>
              <input
                type="number"
                id="groomingHMU"
                name="groomingHMU"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                min="0"
                {...register("groomingHMU")}
              />
            </div>
          </div>
        </div>

        {/* Other Services Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-pink-600">Other Services</h3>
          <div className="space-y-4 mt-4 text-purple-700">
            <div>
              <input
                type="checkbox"
                id="trialMakeup"
                name="trialMakeup"
                onChange={handleServiceChange}
                className="mr-2"
                {...register("trialMakeup")}
              />
              <label htmlFor="trialMakeup" className="text-lg">
                Trial Makeup Upgrade to Airbrush (1,000.00 per head)
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                id="postNup"
                name="postNup"
                onChange={handleServiceChange}
                className="mr-2"
                {...register("postNup")}
              />
              <label htmlFor="postNup" className="text-lg">
                Post-Nup HMU Session
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                id="transportCavite"
                name="Ceremony"
                onChange={handleTransportChange}
                className="mr-2"
                {...register("Ceremony")}
              />
              <label htmlFor="transportCavite" className="text-lg">
                Ceremony: NO Transport Fee within Cavite/Tagaytay
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                id="prenuptialTransport"
                name="Prenup/Postnup"
                onChange={handleTransportChange}
                className="mr-2"
                {...register("Prenup/Postnup")}
              />
              <label htmlFor="prenuptialTransport" className="text-lg">
                Prenup/Postnup: NO Transport Fee within Cavite/Tagaytay
              </label>
            </div>
          </div>
        </div>
        <BUTTON form={!isAnyFieldBlank ? "packageType" : "summary"} />
      </form>
      <div className="flex justify-center ">
        <button
          onClick={() => navigate("/app/summary")}
          className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          SKIP
        </button>
      </div>
    </div>
  );
};

export default AdditionalHeadsForm;
