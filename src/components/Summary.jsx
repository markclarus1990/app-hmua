// src/components/Summary.jsx
import React, { useContext, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPrice, insertBooking } from "../services/price";
import { useForm } from "react-hook-form";
import QRCodeComponent from "./QRCodeComponent";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const { step1, step2, step3, step6, step7, limitedpax } =
    useContext(FormContext);

  const additional =
    Number(step7.adult) +
    Number(step7.groomingHMU) +
    Number(step7.motherRelative) +
    Number(step7.ninang);
  const addTotal = additional * 1300;

  const formattedTotal = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(addTotal);

  const {
    isLoading,
    data: pricing = [],
    error,
  } = useQuery({
    queryKey: ["pricing"],
    queryFn: getPrice,
  });
  const [showQRCode, setShowQRCode] = useState(false);
  const athenaP = pricing?.find((item) => item.name === "Athena");
  const aphroditeP = pricing?.find((item) => item.name === "Aphrodite");
  const heraP = pricing?.find((item) => item.name === "Hera");
  const lOffer = pricing?.find((item) => item.name === "Athena");

  const exclusive = limitedpax * (lOffer?.limited_offer || 0);

  const convert = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  const TOTAL = addTotal + exclusive;
  const fTOTAL = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(TOTAL);

  const athenaTotal = addTotal + athenaP?.price;
  const HeraTotal = addTotal + heraP?.price;
  const aphroditeTotal = addTotal + athenaP?.price;

  const queryClient = useQueryClient();
  const { reset } = useForm();
  const { mutate } = useMutation({
    mutationFn: insertBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insertBooking"] });
      setShowQRCode(true);
      reset();
    },
  });
  let flattenedBooking;
  const handleBook = () => {
    const bookingDetails = {
      clientDetails: {
        clientName: step3?.clientName,
        contactNumber: step3?.contactNumber,
        email: step3?.email,
        socialMedia: step3?.socialMedia,
      },
      weddingInfo: {
        weddingDate: step1?.weddingDate,
        hmuArrival: step1?.hmuArrival,
        ceremonyVenue: step1?.ceremonyVenue,
        prepVenue: step1?.prepVenue,
      },
      packageType: step2,
      additionalHeads: {
        adults: step7?.adult,
        motherRelative: step7?.motherRelative,
        ninang: step7?.ninang,
        groomingHMU: step7?.groomingHMU,
      },
      subtotal: formattedTotal,
      services: {
        trialMakeup: step7?.trialMakeup,
        postNup: step7?.postNup,
      },
      packageDetails: {
        packageSelected: step6,
      },
      total:
        step6 === "Exclusive Offer"
          ? fTOTAL
          : step6 === "ATHENA"
          ? convert(athenaTotal)
          : step6 === "HERA"
          ? convert(HeraTotal)
          : step6 === "APHRODITE"
          ? convert(aphroditeTotal)
          : "N/A",
    };

    flattenedBooking = {
      weddingDate: bookingDetails.weddingInfo.weddingDate,
      hmuArrival: bookingDetails.weddingInfo.hmuArrival,
      prepVenue: bookingDetails.weddingInfo.prepVenue,
      packageType: bookingDetails.packageType,
      adults: bookingDetails.additionalHeads.adults,
      motherRelative: bookingDetails.additionalHeads.motherRelative,
      ninang: bookingDetails.additionalHeads.ninang,
      trialMakeup: bookingDetails.services.trialMakeup,
      postNup: bookingDetails.services.postNup,
      packageSelected: bookingDetails.packageDetails.packageSelected,
      clientName: bookingDetails.clientDetails.clientName,
      contactNumber: bookingDetails.clientDetails.contactNumber,
      email: bookingDetails.clientDetails.email,
      socialMedia: bookingDetails.clientDetails.socialMedia,
      ceremonyVenue: bookingDetails.weddingInfo.ceremonyVenue,
      total: bookingDetails.total,
    };

    console.log("Booking Details:", bookingDetails);
    mutate(flattenedBooking);
  };
  const navigate = useNavigate();
  function handleQR() {
    setShowQRCode(false); // Close QR code modal
    setTimeout(() => {
      navigate("/hmua"); // Navigate to /hmua after a short delay
    }, 100); // Adjust the delay (in ms) as necessary
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-700">Summary</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-purple-600">Wedding Info</h3>
        <ul className="list-disc pl-5 text-lg text-purple-600">
          <li>
            <strong>Wedding Date:</strong> {step1?.weddingDate}
          </li>
          <li>
            <strong>HMUA Team Arrival:</strong> {step1?.hmuArrival}
          </li>
          <li>
            <strong>Ceremony Venue:</strong> {step1?.ceremonyVenue}
          </li>
          <li>
            <strong>Prep Venue:</strong> {step1?.prepVenue}
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-purple-600">Package Type</h3>
        <p className="text-lg text-purple-600">
          <strong>Selected Package:</strong> {step2}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-purple-600">
          Additional Heads <span className="text-red-600">(₱1,300.00)</span>
        </h3>
        <ul className="list-disc pl-5 text-lg text-purple-600">
          <li>
            <strong>Adults:</strong> {step7?.adult}
          </li>
          <li>
            <strong>Mother/Sister/Relative:</strong> {step7?.motherRelative}
          </li>
          <li>
            <strong>Ninang:</strong> {step7?.ninang}
          </li>
          <li>
            <strong>Grooming HMU:</strong> {step7?.groomingHMU}
          </li>
        </ul>
        <h3 className="text-xl font-bold text-purple-600">
          SubTotal: <span className="text-red-700">{formattedTotal}</span>
        </h3>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-purple-600">Other Services</h3>
        <ul className="list-disc pl-5 text-lg text-purple-600">
          <li>
            <strong>Trial Makeup:</strong> {step7?.trialMakeup ? "Yes" : "No"}
          </li>
          <li>
            <strong>Post-Nup HMU:</strong> {step7?.postNup ? "Yes" : "No"}
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-purple-600">Package Details</h3>
        <div className="flex gap-1">
          <p className="text-lg text-purple-600">
            <strong>Package Type Selected:</strong> {step6}
          </p>
          <span className="text-red-700 text-lg">
            {`(${convert(lOffer?.limited_offer)})`}
          </span>
        </div>
        {step6 === "Exclusive Offer" && (
          <h3 className="text-xl font-bold">
            <span className="text-orange-700">({limitedpax}) </span> PAX:{" "}
            <span className="text-red-700">{convert(exclusive)}</span>
          </h3>
        )}

        {step6 === "ATHENA" && (
          <h3 className="text-xl font-bold">
            Subtotal:{" "}
            <span className="text-red-700">{convert(athenaP?.price)}</span>
          </h3>
        )}

        {step6 === "HERA" && (
          <h3 className="text-xl font-bold">
            Subtotal:{" "}
            <span className="text-red-700">{convert(heraP?.price)}</span>
          </h3>
        )}

        {step6 === "APHRODITE" && (
          <h3 className="text-xl font-bold">
            Subtotal:{" "}
            <span className="text-red-700">{convert(aphroditeP?.price)}</span>
          </h3>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="mt-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Total</h1>
          <p className="text-3xl font-bold text-green-800 bg-gray-200 p-4 rounded-lg shadow-lg inline-block">
            {step6 === "Exclusive Offer" && fTOTAL}
            {step6 === "ATHENA" && convert(athenaTotal)}
            {step6 === "HERA" && convert(HeraTotal)}
            {step6 === "APHRODITE" && convert(aphroditeTotal)}
          </p>
        </div>
        <button
          onClick={handleBook}
          className="px-4 py-2 bg-peach-600 text-white rounded-lg hover:bg-peach-300"
        >
          Submit Booking
        </button>
        {showQRCode && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
                Booking Successful!
              </h2>
              <QRCodeComponent
                value={
                  flattenedBooking && Object.keys(flattenedBooking).length > 0
                    ? JSON.stringify(flattenedBooking)
                    : ""
                }
                size={256}
              />
              <div className="mt-4 text-center">
                <button
                  onClick={() => handleQR()}
                  className="px-4 py-2 bg-peach-600 text-white rounded-lg hover:bg-peach-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
