import React, { useEffect } from "react";
import logo from "/logo.png";
import { useFormContext } from "../contexts/FormContext";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { homeScreen } = useFormContext();
  const navigate = useNavigate();
  useEffect(() => {
    // You can log or perform actions to check for remount
    console.log("Homepage component has been remounted.");
  }, []);
  return (
    <>
      {homeScreen === true ? (
        <div className="min-h-screen m-0 p-0 bg-gradient-to-r from-gray-100 via-peach-400 to-peach-600 text-black p-8 flex justify-center items-center">
          <div className="text-center">
            <img src={logo} alt="Logo" className="mb-20" />
            <h1 className="text-4xl font-extrabold mb-4">
              Let me achieve your Dream Look!
            </h1>
            <p className="text-lg mb-6">
              Please click the button below to start the booking process.
            </p>
            <button
              onClick={() => navigate("/app/weddingDetails")}
              className="px-6 py-2 bg-peach-500 text-white rounded-lg hover:bg-peach-600 transition"
            >
              Start Now
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Homepage;
