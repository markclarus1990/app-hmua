import React, { useEffect } from "react";
import logo from "/logo.png";
import { useFormContext } from "../contexts/FormContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Homepage = () => {
  const { homeScreen } = useFormContext();
  const navigate = useNavigate();
  useEffect(() => {
    // You can log or perform actions to check for remount
    console.log("Homepage component has been remounted.");
  }, []);
  const handleLoginSuccess = (response) => {
    const decodedToken = jwtDecode(response.credential);
    const userName = decodedToken.given_name;
    const pic = decodedToken.picture;
    console.log("data", decodedToken);
    localStorage.setItem("auth", true);
    localStorage.setItem("user", userName);
    localStorage.setItem("pic", pic);
    localStorage.setItem("author", decodedToken.email);

    // login(decodedToken);

    navigate("fb/dashboard"); // Navigate to the dashboard page
  };

  const handleLoginError = (error) => {
    console.error("Login Failed:", error);
  };
  return (
    <>
      {homeScreen === true ? (
        <div className="m-0 text-black p-8 flex justify-center items-center w-[500px] xs:w-[300px] mt-[100px] sm:w-[500px] mx-auto bg-peach-100 opacity-[0.8] rounded-lg my-[10px]">
          <div className="text-center">
            <img src={logo} alt="Logo" className="mb-10" />
            <h1 className="text-4xl font-extrabold mb-">
              Let me achieve your Dream Look!
            </h1>
            <p className="text-lg mb-6">
              Please click the button below to start the booking process.
            </p>
            <button
              onClick={() => navigate("/weddingDetails")}
              className="px-6 py-2 bg-peach-500 text-white rounded-lg hover:bg-peach-600 transition"
            >
              Start Now
            </button>
            {/* <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              useOneTap={true} // Optional: for one-tap sign-in
            /> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Homepage;
