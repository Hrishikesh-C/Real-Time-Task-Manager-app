import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  { label: "In Progress", link: "in-progress/in progress", icon: <MdOutlinePendingActions /> },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => (
    <Link
      to={el.link}
      onClick={closeSidebar}
      className={clsx(
        "w-full flex gap-3 px-4 py-3 rounded-xl items-center transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-cyan-500/50 text-gray-300",
        path === el.link.split("/")[0]
          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
          : "bg-gray-900 hover:bg-gradient-to-r from-cyan-400 to-blue-500"
      )}
    >
      <span className="text-xl">{el.icon}</span>
      <span className="font-semibold hover:text-white">{el.label}</span>
    </Link>
  );

  return (
    <div className="w-full h-full flex flex-col gap-6 p-6 bg-gray-950 text-gray-300 shadow-xl rounded-xl backdrop-blur-xl bg-opacity-80 border border-cyan-500/50 neon-border">
      {/* Sidebar Header */}
      <h1 className="flex gap-2 items-center">
        <p className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl shadow-md">
          <MdOutlineAddTask className="text-white text-3xl font-black" />
        </p>
        <span className="text-3xl font-bold text-white tracking-wide">TaskMe</span>
      </h1>

      {/* Sidebar Navigation */}
      <div className="flex-1 flex flex-col gap-y-6 py-8">
        {linkData.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      {/* Settings Button */}
      <div>
        <button className="w-full flex gap-3 p-3 items-center text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50 text-white">
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
