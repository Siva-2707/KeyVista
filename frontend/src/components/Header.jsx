import React, { useContext, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import AppContext from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();

  const {isLoggedIn, setIsLoggedIn, isAdmin} = useContext(AppContext);

  useEffect( () => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn'));
  })

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={isLoggedIn ? "/listings" : "/"} className="text-2xl font-bold text-blue-600">
          KeyVista
        </Link>

        {/* Navigation */}

     

                {isLoggedIn && (
          <nav className="space-x-6 text-gray-700 font-medium hidden md:block">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold underline" : "hover:text-blue-600"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/listings"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold underline" : "hover:text-blue-600"
              }
            >
              {isAdmin ? "Manage Listings" : "Listing"}
            </NavLink>
            {!isAdmin && (
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold underline" : "hover:text-blue-600"
                }
              >
                Contact
              </NavLink>
            )}
          </nav>
        )}


        

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  navigate("/");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
