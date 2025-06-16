import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          KeyVista
        </Link>

        {/* Navigation */}
        <nav className="space-x-6 text-gray-700 font-medium hidden md:block">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/listings" className="hover:text-blue-600">Listings</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          {isLoggedIn && <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>}
        </nav>

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
                  onLogout();
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
