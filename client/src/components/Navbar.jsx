import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  return (
    <div className="w-screen flex justify-center items-center h-16 bg-black font-custom sticky top-0">
      <ul className="flex list-none p-0 m-0 space-x-8 text-white">
        <li>
          <Link
            to="/"
            className={`relative font-custom text-2xl transition-all duration-300`}
          >
            Home
            <span
              className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                location.pathname === "/" ? "scale-x-100" : ""
              }`}
            />
          </Link>
        </li>
        <li>
          <Link
            to="/courses"
            className={`relative font-custom text-2xl transition-all duration-300`}
          >
            Courses
            <span
              className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                location.pathname === "/courses" ? "scale-x-100" : ""
              }`}
            />
          </Link>
        </li>
        <li>
          <Link
            to="/aboutus"
            className={`relative font-custom text-2xl transition-all duration-300`}
          >
            About Us
            <span
              className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                location.pathname === "/aboutus" ? "scale-x-100" : ""
              }`}
            />
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className={`relative font-custom text-2xl transition-all duration-300`}
          >
            Get Started
            <span
              className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                location.pathname === "/register" ? "scale-x-100" : ""
              }`}
            />
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className={`relative font-custom text-2xl transition-all duration-300`}
          >
            Login
            <span
              className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                location.pathname === "/login" ? "scale-x-100" : ""
              }`}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
