// src/components/Summary.jsx
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPrice, insertBooking } from "../services/price";
import { useForm } from "react-hook-form";
import QRCodeComponent from "./QRCodeComponent";
import { useNavigate } from "react-router-dom";
import SignatureComponent from "./SignatureComponent";
import ContractComponent from "./ContractComponent";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { generateCode } from "../helpers/codeGenerator";
import "react-toastify/dist/ReactToastify.css";
const Summary = () => {
  const {
    step1,
    step2,
    step3,
    step6,
    step7,
    limitedpax,
    signature,
    setSignature,
    additional: addval,
  } = useContext(FormContext);
  const navigate = useNavigate();
  const [sig, setSig] = useState();
  useEffect(
    function () {
      if (signature) {
        setSig(signature);
        console.log(sig);
      }
    },
    [signature, sig]
  );
  const additional =
    Number(step7.adult) +
    Number(step7.groomingHMU) +
    Number(step7.motherRelative) +
    Number(step7.ninang);
  const addTotal = isNaN(additional) ? 0 : additional * addval;

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
  const lOffer = pricing?.find((item) => item.name === "Limited Offer");

  const exclusive = limitedpax * (lOffer?.price || 0);

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
      toast.success("Successfully booked!");
      navigate("/");
      reset();
    },
  });

  let flattenedBooking;
  const confirmToast = (message, onConfirm, onCancel) => {
    const id = toast(
      <div
        className="p-6 rounded-lg shadow-lg text-center bg-opacity-90"
        style={{ backgroundColor: "rgba(255, 218, 185, 0.9)" }} // Custom peach background with opacity
      >
        <p className="text-lg font-semibold text-gray-800 mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
            onClick={() => {
              onConfirm();
              toast.dismiss(id); // Close the toast
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition duration-300"
            onClick={() => {
              toast.dismiss(id); // Close the toast
              onCancel(); // Optional callback if needed
            }}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Prevent auto-closing
        closeButton: false,
        hideProgressBar: true, // Hides the progress bar
      }
    );
  };

  // Usage
  const handleClick = () => {
    confirmToast(
      "Are you sure?",
      () => {
        alert("Confirmed!");
        handleBook();
      }, // Action on confirmation
      () => console.log("Toast closed!") // Optional action on cancel
    );
  };
  const [getCode, setGetCode] = useState();
  useEffect(() => {
    setGetCode(generateCode());
  }, []);
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
        ceremonyStart: step1?.ceremonyStart,
        ceremonyVenue: step1?.ceremonyVenue,
        prepVenue: step1?.prepVenue,
        receptionVenue: step1?.receptionVenue,
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
      signat: signature,
    };

    function handleToastClose() {
      mutate(flattenedBooking);
    }

    flattenedBooking = {
      weddingDate: bookingDetails.weddingInfo.weddingDate,
      hmuArrival: bookingDetails.weddingInfo.hmuArrival,
      prepVenue: bookingDetails.weddingInfo.prepVenue,
      ceremonyStart: bookingDetails.weddingInfo.ceremonyStart,
      receptionVenue: bookingDetails.weddingInfo.receptionVenue,
      packageType: bookingDetails.packageType,
      adults: bookingDetails.additionalHeads.adults,
      motherRelative: bookingDetails.additionalHeads.motherRelative,
      ninang: bookingDetails.additionalHeads.ninang,
      groomingHMU: bookingDetails.additionalHeads.groomingHMU,
      trialMakeup: bookingDetails.services.trialMakeup,
      postNup: bookingDetails.services.postNup,
      packageSelected: bookingDetails.packageDetails.packageSelected,
      clientName: bookingDetails.clientDetails.clientName,
      contactNumber: bookingDetails.clientDetails.contactNumber,
      email: bookingDetails.clientDetails.email,
      socialMedia: bookingDetails.clientDetails.socialMedia,
      ceremonyVenue: bookingDetails.weddingInfo.ceremonyVenue,
      total: bookingDetails.total,

      code: getCode,
      status: "0",
    };

    console.log("Booking Details:", flattenedBooking);
    toast.warning(
      "Please secure this code to view your booking status:\n" +
        getCode +
        "\nClose this warning to proceed.",
      { onClose: handleToastClose }
    );
  };

  const [signatureData, setSignatureData] = useState(null);

  const handleSignatureSave = (signatureDataURL) => {
    setSignatureData(signatureDataURL); // Save the signature data URL
  };

  return (
    <div className="flex flex-col py-10 px-2 gap-3 bg-peach-300 w-[500px] mx-auto my-auto rounded-lg mt-4 xs:w-[300px] mt-[5px] sm:w-[500px] md:w-[800px] opacity-[0.8]">
      <div className="bg-white p-6 rounded-lg  flex flex-col gap-2 w-full items-center">
        <h3 className="text-xl font-bold text-pink-600">Wedding Info</h3>
        <ul className=" pl-5 text-lg text-pink-600  list-none flex flex-wrap justify-center gap-2">
          <li>
            <strong>Wedding Date:</strong>{" "}
            <span className="text-peach-600">{step1?.weddingDate}</span>
          </li>
          {/* <li>
            <strong>HMUA Team Arrival:</strong> {step1?.hmuArrival}
          </li> */}
          <li>
            <strong>Ceremony Venue:</strong>{" "}
            <span className="text-peach-600">{step1?.ceremonyVenue}</span>
          </li>
          <li>
            <strong>Prep Venue:</strong>{" "}
            <span className="text-peach-600">{step1?.prepVenue}</span>
          </li>
        </ul>
        {/* <h3 className="text-xl font-bold text-pink-600">Couple Details</h3> */}
        <ul className=" pl-5 text-lg text-pink-600 text-left list-none flex flex-wrap gap-5">
          <li>
            <strong>Couple:</strong>{" "}
            <span className="text-peach-600">{step3?.clientName}</span>
          </li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg  flex flex-col min-w-full items-center">
        <h3 className="text-xl font-bold text-pink-600">Package Details</h3>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <p className="text-lg text-pink-800">{step6}</p>
            <div>
              {step6 === "Exclusive Offer" && (
                <h3 className="text-md font-bold">
                  <span className="text-orange-700">({limitedpax}) </span> PAX:{" "}
                  <span className="text-red-700 text-lg">
                    {`(${convert(lOffer?.price)})`}
                  </span>
                </h3>
              )}
            </div>

            {"("}
            {step6 === "ATHENA" && (
              <h3 className="text-xl font-bold">
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
                <span className="text-red-700">
                  {convert(aphroditeP?.price)}
                </span>
              </h3>
            )}
            {")"}
          </div>
        </div>
      </div>
      {/* <div className="bg-white p-6 rounded-lg ">
        <h3 className="text-xl font-bold text-purple-600">Package Type</h3>
        <p className="text-lg text-purple-600">
          <strong>Selected Package:</strong> {step2}
        </p>
      </div> */}
      <div className="bg-white p-6 rounded-lg  w-full">
        <h3 className="text-xl font-bold text-pink-600">
          Additional Heads{" "}
          <span className="text-red-600">({convert(addval)})</span>
        </h3>

        {addTotal > 0 ? (
          <>
            <ul className="list-none pl-5 text-lg text-purple-600">
              <li>
                <strong>Adults:</strong>{" "}
                <span className="text-peach-600">{step7?.adult}</span>
              </li>
              <li>
                <strong>Mother/Sister/Relative:</strong>{" "}
                <span className="text-peach-600">
                  {step7?.motherRelative || 0}
                </span>
              </li>
              <li>
                <strong>Ninang:</strong>{" "}
                <span className="text-peach-600">{step7?.ninang || 0}</span>
              </li>
              <li>
                <strong>Grooming HMU:</strong>{" "}
                <span className="text-peach-600">
                  {step7?.groomingHMU || 0}
                </span>
              </li>
            </ul>
            <h3 className="text-xl font-bold text-pink-600">
              SubTotal: <span className="text-red-700">{formattedTotal}</span>
            </h3>
          </>
        ) : (
          <h1>NO ADDITIONAL HEADS</h1>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg  w-full">
        <h3 className="text-xl font-bold text-pink-600">Other Services</h3>
        <ul className="list-none pl-5 text-lg text-pink-600">
          <li>
            <strong>Trial Makeup:</strong> {step7?.trialMakeup ? "Yes" : "No"}
          </li>
          <li>
            <strong>Post-Nup HMU:</strong> {step7?.postNup ? "Yes" : "No"}
          </li>
        </ul>
      </div>
      {/* Signature Component */}
      <div className="flex flex-col items-center gap-2">
        <div className="mt-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Initial Price
          </h1>
          <p className="text-3xl font-bold  bg-gray-200 p-4 rounded-lg  flex flex-col">
            <span className="text-pink-800">
              {" "}
              {step6 === "Exclusive Offer" && fTOTAL}
              {step6 === "ATHENA" && convert(athenaTotal)}
              {step6 === "HERA" && convert(HeraTotal)}
              {step6 === "APHRODITE" && convert(aphroditeTotal)}
            </span>
            <span className="text-sm">
              The final price will be reflected after the booking proccess.
            </span>
          </p>
        </div>
        {/* {!signature ? (
          <>
            <ContractComponent
              signature={signature}
              setSignature={setSignature}
              handleBook={handleBook}
            />
          </>
        ) : (
          <>{""}</>
        )}

        {showQRCode && <></>} */}
      </div>

      <span className="bg-slate-50 w-[190px] mx-auto py-2 rounded-lg cursor-pointer">
        {" "}
        <a onClick={handleBook}>
          {" "}
          <FontAwesomeIcon icon={faPaperPlane} className="text-red-500" />
          Submit Booking
        </a>
      </span>
    </div>
  );
};

export default Summary;
