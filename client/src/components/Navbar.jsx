import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import account from '../assets/account.png';
import loggedIn from '../assets/loggedIn.png';

function Navbar() {

  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);

  const close = () => {
      console.log("Menu should be closing");
      setIsOpen(false);
  }

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

      <div className="flex flex-col bg-black mr-[0rem]">
        <div className="flex flex-row">
          <img src={logo} className="w-[7rem] h-[5rem]"/>
          <p className="text-white my-[auto] text-3xl">Intelliprogramming</p>
          <button
            className="flex flex-col gap-3 p-6 focus:outline-none ml-[auto]"
            onClick={toggleMenu}
          >
            {/* Hamburger icon with Tailwind styles */}
            <div
              className={`w-12 h-2 bg-white transition-transform ${
                isOpen ? 'rotate-45 translate-y-5' : ''
              }`}
            ></div>
            <div
              className={`w-12 h-2 bg-white transition-opacity ${
                isOpen ? 'opacity-0' : ''
              }`}
            ></div>
            <div
              className={`w-12 h-2 bg-white transition-transform ${
                isOpen ? '-rotate-45 -translate-y-5' : ''
              }`}
            ></div>
          </button>
        </div>

        {/* Menu content */}
        <nav
          className={` w-[100%] bg-white border border-gray-200 rounded-lg shadow-lg transition-opacity ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col p-4 space-y-2">
            <li className="py-[2rem] border-b border-black">
              <Link
                onClick = {close}
                to="/"
                className={`relative font-custom text-3xl transition-all duration-300`}
              >
                Home
                <span
                  className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                    location.pathname === "/" ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            </li>
            <li className="py-[2rem] border-b border-black" >
              <Link
                onClick = {close}
                to="/courses"
                className={`relative font-custom text-3xl transition-all duration-300`}
              >
                Courses
                <span
                  className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                    location.pathname === "/courses" ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            </li>
            <li className="py-[2rem] border-b border-black">
              <Link
                onClick = {close}
                to="/aboutus"
                className={`relative font-custom text-3xl transition-all duration-300`}
              >
                About Us
                <span
                  className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                    location.pathname === "/aboutus" ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            </li>
            <li className="py-[2rem] border-b border-black">
              <Link
                onClick = {close}
                to="/register"
                className={`relative font-custom text-3xl transition-all duration-300`}
              >
                Get Started
                <span
                  className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                    location.pathname === "/register" ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            </li>
            {isLoggedIn ? (
            <>
              <li className="py-[2rem] border-b border-black">
                <Link
                  onClick = {close}
                  to="/logout"
                  className={`relative font-custom text-3xl transition-all duration-300`}
                >
                  Logout
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                      location.pathname === "/logout" ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              </li>
              <li className="py-[2rem] border-b border-black">
                <Link
                  onClick = {close}
                  to="/account"
                  className={`relative font-custom text-3xl transition-all duration-300`}
                >
                  Account Settings
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                      location.pathname === "/logout" ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              </li>
              </>
            ) : (
                <li className="py-[2rem] border-b border-black">
                <Link
                  onClick = {close}
                  to="/login"
                  className={`relative font-custom text-3xl transition-all duration-300`}
                >
                  Login
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                      location.pathname === "/login" ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              </li>

            )}
          </ul>
        </nav>
      </div>
    );
  } else {

    return (
      <div className="w-screen flex items-center justify-center h-16 bg-black font-custom sticky top-0 relative">
        {/* Centered Navbar Links */}
        <ul className="flex list-none p-0 m-0 space-x-8 text-white">
          <li>
            <Link
              to="/"
              className={`relative font-custom text-2xl transition-all duration-300`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className={`relative font-custom text-2xl transition-all duration-300`}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className={`relative font-custom text-2xl transition-all duration-300`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={`relative font-custom text-2xl transition-all duration-300`}
            >
              Get Started
            </Link>
          </li>
          {isLoggedIn ? (
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
              </li> ) : (
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

              )}

        </ul>
      
        {/* Right-Aligned Account Button (Absolutely Positioned) */}
        
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
            <Link to="/account">
              <img
                src={isLoggedIn ? loggedIn : account} 
                className="w-12 h-12"
                alt="Account"
              />
            </Link>
          </div>
      
      </div>
    );
  }
}

export default Navbar;
