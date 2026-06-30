import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ totalNotes, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      backdrop-blur-xl
      bg-black/20
      border-b
      border-white/10
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
        "
      >
        {/* Logo */}

        <div
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-3xl font-bold text-cyan-400">
            📝 NoteVault
          </h1>

          <p className="text-gray-400 text-sm">
            Organize your thoughts
          </p>
        </div>

        {/* Right Section */}

        <div className="flex items-center gap-4">

          {/* Total Notes */}

          <div
            className="
            bg-white/10
            px-4
            py-2
            rounded-xl
            text-gray-300
            "
          >
            Total Notes :
            <span className="ml-2 font-semibold text-cyan-400">
              {totalNotes}
            </span>
          </div>

          {/* ADDED */}
          {/* Profile Button */}

          <button
            onClick={() => navigate("/profile")}
            className="
            px-5
            py-2
            rounded-xl
            bg-cyan-500
            hover:bg-cyan-600
            transition-all
            duration-300
            font-medium
            "
          >
            👤 Profile
          </button>

          {/* Logout */}

          <button
            onClick={onLogout}
            className="
            px-5
            py-2
            rounded-xl
            bg-red-500
            hover:bg-red-600
            transition-all
            duration-300
            font-medium
            "
          >
            🚪 Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;