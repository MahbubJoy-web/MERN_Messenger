import axios from "axios";
import React, { useState } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaVenusMars, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { updateUser } from "../Slice/UserSlice";

const ProfileCard = () => {
  const userInfo = useSelector((state) => state.mySlice.value);
  const dispatch = useDispatch();

  // Edit Mode Toggle
  const [isEditing, setIsEditing] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    avater: userInfo.avater || "",
    firstName: userInfo.firstName || "",
    lastName: userInfo.lastName || "",
    email: userInfo.email || "",
    phone: userInfo.phone || "",
    gender: userInfo.gender || "Male",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Save
  const handleSave = () => {
    axios
      .post(
        "http://localhost:3000/auth/updateProfile",
        {
          currentUserId: userInfo.userId,
          ...formData,
        },
        { headers: { Authorization: Cookies.get("token") } }
      )
      .then((res) => {
        dispatch(updateUser(formData))
        localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, ...formData }));
        setIsEditing(false); // Exit edit mode
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center relative">
        {/* Edit Icon */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 text-gray-500 hover:text-blue-600"
        >
          <FaEdit size={20} />
        </button>

        {/* Avatar */}
        <div className="w-[90px] h-[90px] rounded-full border-[2px] border-blue-600 mx-auto my-1 overflow-hidden">
          {formData.avater ? (
            <img src={formData.avater} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-400" />
          )}
        </div>

        {/* Username */}
        <div className="flex items-center w-full justify-center mb-2">
          {isEditing ? (
            <div className="flex gap-2 w-2/3">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-1/2 outline-none"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-1/2 outline-none"
              />
            </div>
          ) : (
            <span className="text-2xl font-bold text-gray-800">
              {formData.firstName} {formData.lastName}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-6">My Profile</p>

        {/* User Info */}
        <div className="flex flex-col items-center gap-4">
          {/* Email */}
          <div className="flex items-center w-full justify-center">
            <FaEnvelope className="text-gray-400 mr-3" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-2/3 outline-none"
              />
            ) : (
              <span className="text-gray-700">{formData.email}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center w-full justify-center">
            <FaPhone className="text-gray-400 mr-3" />
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-2/3 outline-none"
              />
            ) : (
              <span className="text-gray-700">{formData.phone}</span>
            )}
          </div>

          {/* Gender */}
          <div className="flex items-center w-full justify-center">
            <FaVenusMars className="text-gray-400 mr-3" />
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-2/3 outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <span className="text-gray-700">{formData.gender}</span>
            )}
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            onClick={handleSave}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard; 

