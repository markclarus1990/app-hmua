import React, { useState } from "react";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";

function NavBar({ setModalOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="flex   bg-peach-500 p-4  w-screen flex-wrap">
      {/* Logo Section */}
      <div className="  text-white mr-auto ml-[20px]">
        <img src={logo} alt="logo" className="h-12 w-24" />
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden mr-[20px]">
        <button
          className="flex mr-auto items-center px-3  py-2 border rounded text-peach-200  border-peach-400 hover:text-white hover:border-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Menu Links */}
      <div
        className={`w-full lg:w-auto lg:flex flex-col lg:flex-row lg:items-center ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <a
          onClick={() => navigate("/")}
          className="block px-4 py-2 mt-2 lg:mt-0 text-white hover:text-white cursor-pointer"
        >
          Home
        </a>
        <a
          onClick={() => setModalOpen(true)}
          className="block px-4 py-2 mt-2 lg:mt-0 text-white hover:text-white cursor-pointer"
        >
          Booking Status
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
