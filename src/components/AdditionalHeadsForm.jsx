import React, { useState } from "react";
import BUTTON from "../ui/BUTTON";
import { useForm } from "react-hook-form";
import { useFormContext } from "../contexts/FormContext";
import { useNavigate } from "react-router-dom";
import { span } from "framer-motion/client";
import { toast } from "react-toastify";
import Input from "../ui/Input";

const AdditionalHeadsForm = ({ onNextStep, pricing }) => {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const [additionalHeads, setAdditionalHeads] = useState({
    adult: 0,
    motherRelative: 0,
    ninang: 0,
    groomingHMU: 0,
  });
  const additional = pricing?.find((item) => item?.name === "Additional Heads");
  function convert(price) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  }

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

  const {
    setStep7Data,
    step7,
    setAdditional,
    additional: adv,
  } = useFormContext();
  let isAnyFieldBlank;
  const onSubmit = (data) => {
    // Check if any field is blank
    // isAnyFieldBlank =
    //   !data.adult || !data.motherRelative || !data.ninang || !data.groomingHMU;

    // if (isAnyFieldBlank) {
    //   toast.error("Please fill in all the required fields.");
    //   return; // Prevent form submission if any field is blank
    // }

    setStep7Data(data);
    console.log(additional.price);
    setAdditional(additional.price);
    console.log("ADD", adv);
    console.log("FROM CONTEXT", step7);
    navigate("/summary");
  };

  return (
    <div className="space-y-6 m-0">
      <h2 className="text-2xl font-semibold text-purple-700 m-0">
        Additional Heads and Services
      </h2>

      {/* Additional Heads Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex gap-2">
            <h3 className="text-xl font-bold text-pink-600">
              Additional Heads{" "}
            </h3>
            (
            <span className="text-red-700 text-xl">
              {convert(additional.price)}
            </span>
            )
          </div>
          <div className="space-y-4 mt-4 text-purple-700">
            <div>
              <label htmlFor="adult" className="text-lg text-pink-700">
                ADULT
              </label>
              <Input
                name={"adult"}
                type={"number"}
                placeholder={
                  "You can leave this blank and proceed to next form if you don't have any additional"
                }
                register={register}
                className="w-full text-center p-3 mt-2 rounded-lg bg-white text-pink-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label htmlFor="motherRelative" className="text-lg text-pink-700">
                Mother/Sister/Relative
              </label>

              <Input
                name={"motherRelative"}
                type={"number"}
                placeholder={
                  "You can leave this blank and proceed to next form if you don't have any additional"
                }
                register={register}
              />
            </div>

            <div>
              <label htmlFor="ninang" className="text-lg text-pink-700">
                Ninang
              </label>

              <Input
                name={"ninang"}
                type={"number"}
                placeholder={
                  "You can leave this blank and proceed to next form if you don't have any additional"
                }
                register={register}
              />
            </div>

            <div>
              <label htmlFor="groomingHMU" className="text-lg text-pink-700">
                Grooming HMU
              </label>

              <Input
                name={"groomingHMU"}
                type={"number"}
                placeholder={
                  "You can leave this blank and proceed to next form if you don't have any additional"
                }
                register={register}
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
      {/* <div className="flex justify-center ">
        <button
          onClick={() => {
            navigate("/summary");
            setAdditional(additional.price);
          }}
          className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          SKIP
        </button>
      </div> */}
    </div>
  );
};

export default AdditionalHeadsForm;
