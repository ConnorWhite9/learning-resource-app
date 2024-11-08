import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";


function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Function to toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  if (isPortrait) {
    return (
      <div className="relative">
        <button
          className="flex flex-col gap-1 p-2 focus:outline-none"
          onClick={toggleMenu}
        >
          {/* Hamburger icon with Tailwind styles */}
          <div
            className={`w-6 h-0.5 bg-gray-800 transition-transform ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-gray-800 transition-opacity ${
              isOpen ? 'opacity-0' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-gray-800 transition-transform ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></div>
        </button>

        {/* Menu content */}
        <nav
          className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-opacity ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <ul className="flex flex-col p-4 space-y-2">
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
        </nav>
      </div>
    );
  } else {

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
          <li>
            <Link
              to="/logout"
              className={`relative font-custom text-2xl transition-all duration-300`}
            >
              Logout
              <span
                className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                  location.pathname === "/logout" ? "scale-x-100" : ""
                }`}
              />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
