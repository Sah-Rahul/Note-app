import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <nav className="bg-white/5 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold text-white tracking-wide hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2"
            >
              📝 <span className="hidden sm:inline">myNotes</span>
            </Link>

            <div className="flex items-center space-x-3 sm:space-x-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-all"
                  >
                    My Notes
                  </Link>

                  <Link
                    to="/create-note"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-lg"
                  >
                    Create Note
                  </Link>

                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
       
      </nav>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
