import React from "react";
import { FaComments, FaUsers, FaBan, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navber = () => {
    const userInfo = useSelector(state=>state.mySlice.value)
  return (
    <div className="w-20 h-screen bg-gray-100 border border-l border-gray-300 flex flex-col justify-between items-center py-6 shadow-lg">
      {/* Top Section */}
      <div className="space-y-8">
        {/* Chatbox */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-800 duration-200"
            }`
          }
        >
          <FaComments className="text-2xl mb-1" />
          Chat
        </NavLink>

        {/* All Users */}
        <NavLink
          to="/alluser"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-800 duration-200"
            }`
          }
        >
          <FaUsers className="text-2xl mb-1" />
          Users
        </NavLink>

        {/* Block */}
        <NavLink
          to="/blockUser"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-800 duration-200"
            }`
          }
        >
          <FaBan className="text-2xl mb-1" />
          Block
        </NavLink>
      </div>

      {/* Bottom Section - Profile */}
      <div className="pb-4">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-800 duration-200"
            }`
          }
        >
          <div className="w-[50px] h-[50px] border border-gray-500 bg-gray-300 rounded-full overflow-hidden mb-1">
            <img src={userInfo?.avater} alt="" />
          </div>
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Navber;
