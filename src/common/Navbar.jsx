import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../firebase/useAuth";

const activeClass =
  "text-blue-600 px-4 py-2 text-sm font-semibold relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-indigo-600 after:rounded-full";
const normalClass =
  "text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, loading } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo (left) */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={logo}
                  alt="FinSight Logo"
                  width={50}
                  height={50}
                  className="block transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FinSight
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Features
            </NavLink>

            

            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Pricing
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              About Us
            </NavLink>

            {!loading && (
              <>
                {currentUser ? (
                  <Link
                    to="/dashboard"
                    className="ml-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transform hover:scale-105 transition-all duration-300"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transform hover:scale-105 transition-all duration-300"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            Home
          </NavLink>

          <NavLink
            to="/features"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            Features
          </NavLink>


          <NavLink
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            Pricing
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            About
          </NavLink>

          {!loading && (
            <>
              {currentUser ? (
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Dashboard
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  >
                    Login
                  </NavLink>

                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl text-base font-semibold shadow-lg shadow-blue-500/50 mt-4 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
