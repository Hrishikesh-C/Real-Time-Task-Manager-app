import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="flex justify-between items-center bg-gray-950 px-6 py-3 2xl:py-4 sticky top-0 z-20 shadow-md shadow-cyan-500/50 border-b border-cyan-500/30 transition-all">
      {/* Left Side: Menu Button + Search */}
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-2xl text-cyan-400 block md:hidden hover:text-white transition"
          aria-label="Open Sidebar"
        >
          ☰
        </button>

        {/* Search Bar */}
        <div className="w-64 2xl:w-[400px] flex items-center py-2 px-4 gap-2 rounded-full bg-gray-800 border border-cyan-500/50 hover:border-cyan-400/80 transition">
          <MdOutlineSearch className="text-cyan-400 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none bg-transparent text-white placeholder:text-cyan-400"
          />
        </div>
      </div>

      {/* Right Side: Notifications & User Avatar */}
      <div className="flex gap-4 items-center">
        <div className="relative">
          {/* Notification Panel with Glow Effect */}
          <div className="p-2 bg-gray-800 rounded-full border border-cyan-400 shadow-md shadow-cyan-500/50 hover:bg-cyan-500/20 transition">
            <NotificationPanel />
          </div>
        </div>

        <UserAvatar />
      </div>
    </nav>
  );
};

export default Navbar;
