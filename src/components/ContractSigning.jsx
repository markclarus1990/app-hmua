import React, { useEffect, useRef, useState } from "react";
import logo from "/logo.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBookings, getPrice, updateBooking } from "../services/price";
import SelectTeam from "./SelectTeam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import POLI from "./POLI";
import { convert } from "../../utils/HELP";
import { useFormContext } from "../contexts/FormContext";

const ContractSigning = ({
  signature,
  setSignature,
  booking_id,
  prenup,
  selectedTeam,
  handleTeamSelect,
  availableTeams,
  newEvent,
  handleEventFormChange,
  handleModalClose,
  handleAddEventConfirm,
  modalOpen,
  setModalOpen,
  admin = true,
}) => {
  const updateBookingMutation = useMutation({
    mutationFn: updateBooking,
  });

  const [brideName, setBrideName] = useState("");
  const [agreementDate, setAgreementDate] = useState("");
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    // Temporarily replace the document's content with the component's content
    document.body.innerHTML = printContent.innerHTML;
    window.print();

    // Restore the original document content
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to reset the app state
  };

  const { data: availableBookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
    staleTime: 0,
  });
  const {
    code: CODE,
    setCode,
    setBookingId,
    booking_id: book_id,
  } = useFormContext();

  useEffect(() => {
    const selectedBooks = availableBookings?.find(
      (book) => book?.code == CODE // Loose equality to handle string/number mismatch
    );
    if (selectedBooks) {
      // sessionStorage.setItem("book", selectedBooks);
      setSelectedBook(selectedBooks);
      setBookingId(selectedBooks?.booking_id);
      const formattedDate = new Date(
        selectedBooks?.weddingDate
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setFormattedDATE(formattedDate);
    }
  }, [CODE, availableBookings]);

  const [selectedBook, setSelectedBook] = useState();
  const [formattedDATE, setFormattedDATE] = useState();
  const [makeUpChangeLook, setMakeupChangeLook] = useState(1200);
  const handleChangeLook = (e) => {
    const value = e.target.value;

    // Remove non-numeric characters except decimal and currency symbol
    const numericValue = value.replace(/[^\d.]/g, "");

    // Ensure we only update the state with the numeric value
    setMakeupChangeLook(numericValue);
  };

  const [hairChangeLook, setHairChangeLook] = useState(500);
  const handleHairChangeLook = (e) => {
    const value = e.target.value;

    // Remove non-numeric characters except decimal and currency symbol
    const numericValue = value.replace(/[^\d.]/g, "");

    // Ensure we only update the state with the numeric value
    setHairChangeLook(numericValue);
  };

  const [previlege, setPrevilege] = useState(2500);
  const handlePrevilege = (e) => {
    const value = e.target.value;

    // Remove non-numeric characters except decimal and currency symbol
    const numericValue = value.replace(/[^\d.]/g, "");

    // Ensure we only update the state with the numeric value
    setPrevilege(numericValue);
  };

  const [arrival, setArrival] = useState();
  const [hmuaStart, setHmuaStart] = useState();
  function convertTo12HourFormat(time24) {
    // Split the time into hours and minutes
    if (time24) {
      let [hours, minutes] = time24.split(":").map(Number);

      // Determine AM or PM
      let period = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      hours = hours % 12 || 12; // Adjust 0 (midnight) to 12

      // Return the formatted time
      return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
    }
  }

  const {
    isLoading,
    data: initialPricing = [], // Default to an empty array
    error,
  } = useQuery({
    queryKey: ["pricing"],
    queryFn: getPrice,
  });

  const selectedPack = initialPricing?.find(
    (el) =>
      el?.name ===
      selectedBook?.packageSelected.charAt(0).toUpperCase() +
        selectedBook?.packageSelected.slice(1).toLowerCase()
  );
  const selectedPrice = initialPricing?.find(
    (el) =>
      el?.name ===
      selectedBook?.packageSelected.charAt(0).toUpperCase() +
        selectedBook?.packageSelected.slice(1).toLowerCase()
  );
  const getSelectedPrice = initialPricing.find(
    (el) => el.name === selectedPrice?.packageSelected
  );
  console.log("SELECTED PRICE", selectedPrice);
  const selectedPackExclusive = initialPricing?.find(
    (el) => el?.name === "Exclusive Offer"
  );
  console.log("SELECTED PACK", selectedBook);
  console.log(initialPricing);
  const MCL = initialPricing.find((el) => el.name === "MCL");
  const HCL = initialPricing.find((el) => el.name === "HCL");
  const PR = initialPricing.find((el) => el.name === "Privilege Rate");
  const ABAY = initialPricing.find((el) => el.name === "ABAY");
  const KIDS = initialPricing.find((el) => el.name === "KIDS");
  const MEN = initialPricing.find((el) => el.name === "MHMU");

  // Dates
  const [collected, setCollected] = useState();
  const [depositorDate, setDepositorDate] = useState();
  const [dueDate, setDueDate] = useState();
  const [paymentMode, setPaymentMode] = useState();
  const [rcvdDate, setRcvdDate] = useState();
  // const [paymentMode, setPaymentMode] = useState();

  function handleCollectedChange(e) {
    setCollected(e.target.value);
  }
  function handleDepoDate(e) {
    setDepositorDate(e.target.value);
  }

  function handlePaymentMode(e) {
    setPaymentMode(e.target.value);
  }

  function handleDueDate(e) {
    setDueDate(e.target.value);
  }

  // MONEY
  const [modeOfPayment, setModeOfPayment] = useState();
  const [accountName, setAccountName] = useState();
  const [bankName, setBankName] = useState();
  const [accntName, setAccntName] = useState();

  const [refNum, setRefnum] = useState();
  const [rf, setRf] = useState(0);
  const [transpo, setTranspo] = useState(0);

  // const [balance, setBalance] = useState();

  const initialPrice = selectedBook?.total.replace(/[₱,]/g, "");
  const balance = initialPrice - rf;
  console.log("BALANCE", balance);
  const totalAdditionPRice =
    parseFloat(
      parseFloat(selectedBook?.adults) +
        parseFloat(selectedBook?.motherRelative) +
        parseFloat(selectedBook?.ninang) +
        parseFloat(selectedBook?.groomingHMU)
    ) || 0 * 1300;

  const totalPRICE = parseFloat(initialPrice) + parseFloat(transpo);
  return (
    <div className="p-6 font-sans bg-white w-[600px] mx-auto ">
      <div ref={printRef}>
        <div className="flex gap-2 justify-between">
          <img src={logo} alt="" className="h-[100px] w-[200px]" />
          <span className="text-end">
            <p className="font-elegant text-[12px]">
              Let me achieve your Dream Look! Contacts: Viber|Call|Text:
              09155368015 Website
              https://graceclarus.wixsite.com/gracemakeupartist FB Page:
              graceHMUArtist Instagram: grace28_makeupartist DTI BUSINESS PERMIT
              NO.:3978191
            </p>
          </span>
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-semibold text-peach-600 text-center">
            WEDDING DETAILS
          </h3>
          <table className="w-full table-auto border-collapse">
            <tbody>
              <tr className="border border-gray-400 text-[10px]">
                <td className="py-2 text-left border border-gray-400 text-[10px]">
                  Wedding Date:<strong>{formattedDATE}</strong>
                </td>

                <td className="py-2 text-left border border-gray-400 text-[10px]">
                  HMUA TEAM ARRIVAL:{" "}
                  {
                    <input
                      disabled={admin}
                      type="time"
                      value={arrival || selectedBook?.hmuArrival}
                      onChange={(e) => setArrival(e.target.value)}
                      placeholder="Enter time of arrival"
                    ></input>
                  }
                </td>
                <td className="py-2 text-left border border-gray-400 text-[10px]">
                  HMU START:{" "}
                  {
                    <input
                      disabled={admin}
                      type="time"
                      value={hmuaStart || selectedBook?.hmuArrival}
                      onChange={(e) => setHmuaStart(e.target.value)}
                    ></input>
                  }
                </td>
                <td className="py-2 text-left border border-gray-400 text-[10px]">
                  Ceremony Starts:{" "}
                  <strong>
                    {convertTo12HourFormat(selectedBook?.ceremonyStart)}
                  </strong>
                </td>
              </tr>

              <tr className="border border-gray-400 text-[10px]">
                <td className="py-2 text-left border border-gray-400 text-[10px]">
                  Ceremony Venue: <strong>{selectedBook?.ceremonyVenue}</strong>
                </td>
                <td className="py-2 text-left border border-gray-400 text-[10px]">
                  Prep. Venue: <strong>{selectedBook?.prepVenue}</strong>
                </td>
                <td
                  className="py-2 text-left border border-gray-400 text-[10px]"
                  colSpan={2}
                >
                  Reception Venue:{" "}
                  <strong>{selectedBook?.receptionVenue}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          {/* PRENUP DETAILS */}
          {prenup && (
            <div className="">
              <h4 className="text-lg font-semibold mb-4">PRENUP DETAILS</h4>
              <p className="mb-4">
                Prenup Venue: <strong>NONE</strong>
              </p>
              <p className="mb-4">
                Prenup Shoot starts: <strong>NONE</strong>
              </p>
            </div>
          )}

          {/* COUPLE’S DETAILS */}
          <h3 className="text-xl font-semibold text-peach-600 mt-4 text-center mb">
            COUPLE’S DETAILS
          </h3>
          <p className="mb-4 text-start">
            Couple's Name: <strong>{selectedBook?.clientName}</strong>
          </p>
          <p className="mb-4 text-start">
            Contact Number: <strong>{selectedBook?.contactNumber}</strong>
          </p>
          <p className="mb-4 text-start">
            Email: <strong>{selectedBook?.email}</strong>
          </p>
          <p className="mb-4 text-start">
            FB|Insta: <strong>{selectedBook?.socialMedia}</strong>
          </p>
        </div>

        <div className="mt-10 text-start flex flex-col ">
          <h3 className="text-xl font-semibold text-peach-600 mb-2 text-center">
            DETAILS OF SERVICE(S) CHOSEN
          </h3>
          <p>
            <strong>PACKAGED SELECTED: </strong>
            <span>
              {/* <strong>{selectedPack?.description}</strong> */}
              <h3 className="text-xl font-bold text-peach-600">
                {selectedBook?.packageSelected}{" "}
                <span>({convert(selectedPrice?.price)})</span>
              </h3>
              <ul className="list-none pl-5 text-lg text-purple-600">
                <li
                  dangerouslySetInnerHTML={{
                    __html: selectedPackExclusive?.description,
                  }}
                ></li>

                <li
                  dangerouslySetInnerHTML={{
                    __html: selectedPack?.description,
                  }}
                ></li>
              </ul>
            </span>
            <span className="text-lg">
              <span className="text-peach-600 font-bold">Additional Head:</span>
              <p>Adult:{selectedBook?.adults || 0}</p>
              <p>Mother/Sister/Relative:{selectedBook?.motherRelative || 0}</p>
              <p>Ninang:{selectedBook?.ninang || 0}</p>
              <p>Grooming HMU:{selectedBook?.groomingHMU || 0}</p>
              <p>
                Additional Heads Total:
                {convert(totalAdditionPRice * 1300)}
              </p>
            </span>
            <span className="text-lg">
              <span className="text-peach-600 font-bold">Initial Price:</span>
              {selectedBook?.total || 0}
            </span>
            <br />
            <span className="text-lg">
              <span className="text-peach-600 font-bold">
                Transportation fee:
                <span>
                  <input
                    type="text"
                    value={transpo || convert(selectedBook?.transpo)}
                    onChange={(e) => setTranspo(e.target.value)}
                    name=""
                    id=""
                    disabled={true}
                  />
                </span>
              </span>
            </span>
            <br />
            <span className="text-lg">
              <span className="text-peach-600 font-bold">Total Price:</span>
              {convert(totalPRICE)}
            </span>
          </p>
          <span>
            {" "}
            <strong>ASSIGNED TEAM:</strong>
            {selectedBook?.selectedTeam}
          </span>

          <p>
            ****************************************************************************
          </p>
          <p className="mb-4">
            <strong className="underline text-red-600">
              KONDISYON para sa sitwasyong may mag-cancel na Entourage sa on the
              day ng wedding:
            </strong>
          </p>
          <ul className="list-none list-inside mb-4 text-start">
            <li className="before:content-['➡️'] before:mr-2">
              Kung sa OTD ng kasal po ay{" "}
              <strong>MABABAWASAN OR MAY MAG CANCEL</strong> sa naka-declared po
              na FINAL COUNT na walang further notice (
              <span>
                <em className="text-red-600">
                  {" "}
                  confirmation of{" "}
                  <strong className="text-red-600">FINAL COUNT</strong> must be
                  announced at least 1 day before the Wedding
                </em>
              </span>
              ), MANANATILI pa rin po ang <strong>TOTAL BILL</strong> ng{" "}
              <strong>DECLARED FINAL COUNT</strong> at ang halaga nito ay
              kailangan mabayaran ng buo.
            </li>
            <li>
              SA PROMO RATE po natin na{" "}
              <strong>1,300.00 per head, ONE LOOK</strong> lang po sa Makeup &
              Hairstyle ang included nito.
            </li>
            <li>
              ADDITIONAL UPGRADE FEES: <br />- Makeup Change Look ={" "}
              {/* <span>
                <input disabled={admin}
                  type="text"
                  value={
                    makeUpChangeLook === ""
                      ? ""
                      : `₱${parseFloat(makeUpChangeLook).toLocaleString()}.00`
                  }
                  onChange={handleChangeLook}
                />
              </span>{" "} */}
              {convert(MCL?.price)}
              <br />- Hairstyle Change Look ={" "}
              {/* <span>
                <input disabled={admin}
                  type="text"
                  value={
                    hairChangeLook === ""
                      ? ""
                      : `₱${parseFloat(hairChangeLook).toLocaleString()}.00`
                  }
                  onChange={handleHairChangeLook}
                />
              </span>{" "} */}
              {convert(HCL?.price)}
            </li>
          </ul>
        </div>

        {/* New Privileges Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-peach-600 mb-1 te">
            PRIVILEGES:
          </h3>
          <ul className="list-disc list-inside mb-4 text-start">
            <li>
              Privilege Rate of{" "}
              {/* <span>
                <input disabled={admin}
                  type="text"
                  value={
                    previlege === ""
                      ? ""
                      : `₱${parseFloat(previlege).toLocaleString()}.00`
                  }
                  onChange={handlePrevilege}
                  className="w-[80px] text-red-600"
                />
              </span> */}
              <span className="text-red-600"> {convert(PR?.price)}</span>
              <span className="text-red-600"> Discount on</span> PRENUP Package
            </li>
            <li>
              Eligible to avail <strong>PROMO RATES</strong> for ADDITIONAL
              HEADS:
            </li>
            <li>
              ABAY Traditional Makeup & Hairstyle, Free Lashes (min. of 5 PAX) =
              <span>{convert(ABAY?.price)}</span> per head
            </li>
            <li>
              KIDS (9yrs old below) Makeup & Hairstyle ={" "}
              <span>{convert(KIDS?.price)}</span> per head
            </li>
            <li>
              Men Entourage grooming HMU = <span>{convert(MEN?.price)}</span>{" "}
              per head
            </li>
          </ul>
        </div>
        <p className="mt-0">
          ****************************************************************************
        </p>
        <div className="mt-0 border-t-2 border-gray-300 pt-6 text-start flex flex-col ">
          <h3 className="text-xl font-semibold text-peach-600 mb-2 text-center">
            ACKNOWLEDGEMENT OF PAYMENT
          </h3>
          {/* <p className="mb-4">
            (The Makeup Artist will fill up the table below)
          </p> */}
          <p className="mb-4">
            <strong>PAYMENT:</strong> {convert(selectedBook?.dp)}
            <br />
            <strong>Date Deposited/Collected:</strong>{" "}
            {selectedBook?.date_collected}
          </p>
          <p className="mb-4">
            <strong>REMAINING BALANCE:</strong> {convert(totalPRICE - rf)}
            <br />
            <strong>DUE DATE:</strong>
            {selectedBook?.due_date}{" "}
          </p>
          <p className="mb-4">
            I have read, understand and agree to the terms of this contract.
            Downpayment is due upon submission of this document to Grace Clarus
            Sibayan Makeup Artist or Emmanuel V. Sibayan (Husband-authorized
            business partner).
          </p>
          <p className="mb-4">
            <strong>MODE OF PAYMENT:</strong> {selectedBook?.modeOfPayment}
            <br />
            <strong>ACCOUNT NAME:</strong> {selectedBook?.accntName}
            <br />
            <strong>Bank Name:</strong> {selectedBook?.bankName}
            <br />
            <strong>Ref. #:</strong> {selectedBook?.refNum}
          </p>

          <p className="mb-4">
            <strong>Signature of the Depositor/Representative:</strong>{" "}
            <span className="block mt-4">(Signature Over PRINTED name):</span>
          </p>
          <p className="mb-4">
            <strong>Date:</strong> {selectedBook?.depositorDate}
          </p>

          <p>
            <strong>Payment Acknowledged/Received by:</strong>
            <br />
            MARY GRACE MILYN C. SIBAYAN
            <br />
            <strong>Date:</strong> {selectedBook?.rcvdDate}
          </p>
        </div>
        <p>
          ****************************************************************************
        </p>
        <h2 className="text-2xl font-bold mb-4 text-peach-600 text-center">
          Bridal Agreement
        </h2>

        <p className="mb-1 text-lg">
          I,{" "}
          <input
            disabled={true}
            type="text"
            className="border-b-2 border-gray-400 text-[10px] focus:outline-none focus:border-peach-600 px-2"
            value={selectedBook?.clientName || ""}
            placeholder="Bride/Groom's Name"
          />
          , understand and agree to pay the non-refundable and non-transferable
          downpayment in order to secure the appointment for my wedding day. I
          agree to pay:
        </p>

        <ul className="list-disc list-inside mb-1">
          <li>
            <strong>2nd Payment:</strong> PRENUP DAY ={" "}
            {convert(totalPRICE - rf)}
          </li>
          <li>
            <strong>3rd Payment:</strong> WEDDING DAY = remaining balance
          </li>
        </ul>
        <p>
          ****************************************************************************
        </p>
        <POLI />
        {/* <div className="mt-6">
          <h3 className="text-xl font-semibold text-peach-600 mb-2">
            Signatures:
          </h3>
          <div className="mb-4">
            <p className="mb-2">
              <strong>Bride’s/Groom’s Signature/Representative:</strong>{" "}
              <img
                src={selectedBook?.signature || ""}
                alt="signature"
                className="w-[300px] h-[200px]"
              />
              <span className="block mt-20">
                (Over your PRINTED name): {brideName || "__________"}
              </span>
            </p>
            <p>
              <strong>Date:</strong>{" "}
              <input disabled={admin}
                type="date"
                value={agreementDate}
                onChange={(e) => setAgreementDate(e.target.value)}
              />
            </p>
          </div>
        </div> */}
      </div>

      {/* <div className="mt-3 flex justify-center">
        <button
          className="bg-peach-600 text-white px-6 py-2 rounded-lg hover:bg-peach-700"
          onClick={handlePrint}
        >
          Print Agreement
        </button>
      </div> */}
    </div>
  );
};

export default ContractSigning;
