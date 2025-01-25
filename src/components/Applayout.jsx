import { Outlet, useLocation, useNavigate } from "react-router-dom";
import athena from "../../public/athena.png";
import NavBar from "./NavBar";
import SimpleFooter from "./Footer";
import { useEffect, useState } from "react";
import { useFormContext } from "../contexts/FormContext";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/price";
import background from "/back.jpg";
import { toast } from "react-toastify";
import CheckCode from "./CheckCode";

function Applayout() {
  const location = useLocation();
  console.log(location.pathname.split("/")[1]);
  const converted = location.pathname.split("/")[1];
  console.log(converted);
  const path = {
    weddingDetails: "WEDDING DETAILS",
    PackageSelection: "HMUA SERVICES",
    CoupleDetailsForm: "Couple's Details",
    ServiceSelectionForm: "Reminders",
    packageType: " Package Type",
    summary: "Summary",
  };
  const navigate = useNavigate();
  const { code: CODE, setCode } = useFormContext();
  const [modalOpen, setModalOpen] = useState();

  const [codeInput, setCodeInput] = useState();
  const { data: availableBookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
    staleTime: 0,
  });

  useEffect(
    function () {
      const sCode = availableBookings?.find((el) => el?.code === codeInput);
      setSetlectedBook(sCode);
      console.log("HEERE", availableBookings);
    },
    [CODE, availableBookings, codeInput]
  );

  const [selectedBook, setSetlectedBook] = useState();
  const handleCode = () => {
    setCode(codeInput);
    if (!selectedBook) {
      toast.error(`CODE '${codeInput}'${" "}NOT FOUND!`);
      setCodeInput("");
    } else {
      console.log("SELECTED BOOK", selectedBook);
      if (selectedBook.status === "1") {
        navigate("/contract");
        setModalOpen(false);
      } else if (selectedBook.status === "2") {
        toast.warning("This booking is already processed.");
        setCodeInput("");
      } else {
        toast.warning("Book still on process");
      }
    }
  };

  return (
    <div
      className="bg-cover min-h-screen flex flex-col bg-peach-200 text-black mx-auto text-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {location.pathname === "/" ? (
        ""
      ) : (
        <>
          <NavBar setModalOpen={setModalOpen} />
          <div className="header  sticky top-0 bg-peach-500 h-[50px] flex flex-col items-center justify-center text-[30px] text-white  pb-3 pt-3">
            {path[converted]}
          </div>
        </>
      )}
      <div className="max-w-10xl mx-2 my-auto flex flex-col flex-grow mb-3">
        <Outlet />
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50  items-center justify-center flex flex-col gap-2">
            <div className=" p-5 rounded-xl">
              <CheckCode
                setModalOpen={setModalOpen}
                codeInput={codeInput}
                setCodeInput={setCodeInput}
                handleCode={handleCode}
                selectedBook={selectedBook}
              />
              {/* <span className="flex flex-col gap-1">
                <label htmlFor="" className="text-start">
                  Enter CODE
                </label>

                <input
                  type="text"
                  placeholder="GHMUA-XXXXX"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                />
                <button
                  className="py-1 bg-peach-500 text-white rounded-lg"
                  onClick={handleCode}
                >
                  Submit
                </button>
              </span> */}
            </div>
          </div>
        )}
      </div>
      <SimpleFooter className="bg-peach-500 text-white py-4 mt-auto" />
    </div>
  );
}

export default Applayout;
