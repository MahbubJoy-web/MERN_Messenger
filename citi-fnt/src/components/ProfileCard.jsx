// import axios from "axios";
// import React, { useState } from "react";
// import { FaUserCircle, FaEnvelope, FaPhone, FaVenusMars, FaEdit } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import { updateUser } from "../Slice/UserSlice";

// const ProfileCard = () => {
//   const userInfo = useSelector((state) => state.mySlice.value);
//   const dispatch = useDispatch();
//   const [file , setfile] = useState(null)
  
//   const pic =()=>{

//     const formData = new FormData()
  
//     formData.append('avater' , file)
//     axios
//       .post(
//         "http://localhost:3000/auth/updateProfile",formData)
//         .then((re)=>console.log(re))
//         .catch((res)=>console.log(res))

//   }
  
//   // Edit Mode Toggle
//   const [isEditing, setIsEditing] = useState(false);

//   // Form Data
//   const [formData, setFormData] = useState({
//     avater: userInfo.avater || "",
//     firstName: userInfo.firstName || "",
//     lastName: userInfo.lastName || "",
//     email: userInfo.email || "",
//     phone: userInfo.phone || "",
//     gender: userInfo.gender || "Male",
//   });

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Save
//   const handleSave = () => {
    
    
//     axios
//       .post(
//         "http://localhost:3000/auth/updateProfile",formData,
//         {
//           currentUserId: userInfo.userId,
//           ...formData,
//         },
//         { headers: { Authorization: Cookies.get("token") } }
//       )
//       .then((res) => {
//         dispatch(updateUser(formData))
//         localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, ...formData }));
//         setIsEditing(false); // Exit edit mode
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center relative">
//         {/* Edit Icon */}
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="absolute top-4 right-4 text-gray-500 hover:text-blue-600"
//         >
//           <FaEdit size={20} />
//         </button>

//         {/* Avatar */}
//         <div className="w-[90px] h-[90px] rounded-full border-[2px] border-blue-600 mx-auto my-1 overflow-hidden">
//           {formData.avater ? (
//             <img src={formData.avater} alt="avatar" className="w-full h-full object-cover" />
//           ) : (
//             <FaUserCircle className="w-full h-full text-gray-400" />
//           )}
//         </div>
//         {/* photo */}
//         <input type="file" onChange={(e)=>setfile(e.target.files[0])} />

//         <button onClick={pic} className="p-2 border border-gray-950 ">pic</button>

//         {/* Username */}
//         <div className="flex items-center w-full justify-center mb-2">
//           {isEditing ? (
//             <div className="flex gap-2 w-2/3">
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-1/2 outline-none"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-1/2 outline-none"
//               />
//             </div>
//           ) : (
//             <span className="text-2xl font-bold text-gray-800">
//               {formData.firstName} {formData.lastName}
//             </span>
//           )}
//         </div>
//         <p className="text-sm text-gray-500 mb-6">My Profile</p>

//         {/* User Info */}
//         <div className="flex flex-col items-center gap-4">
//           {/* Email */}
//           <div className="flex items-center w-full justify-center">
//             <FaEnvelope className="text-gray-400 mr-3" />
//             {isEditing ? (
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-2/3 outline-none"
//               />
//             ) : (
//               <span className="text-gray-700">{formData.email}</span>
//             )}
//           </div>

//           {/* Phone */}
//           <div className="flex items-center w-full justify-center">
//             <FaPhone className="text-gray-400 mr-3" />
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-2/3 outline-none"
//               />
//             ) : (
//               <span className="text-gray-700">{formData.phone}</span>
//             )}
//           </div>

//           {/* Gender */}
//           <div className="flex items-center w-full justify-center">
//             <FaVenusMars className="text-gray-400 mr-3" />
//             {isEditing ? (
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-2/3 outline-none"
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <span className="text-gray-700">{formData.gender}</span>
//             )}
//           </div>
//         </div>

//         {/* Save Button */}
//         {isEditing && (
//           <button
//             onClick={handleSave}
//             className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Save Changes
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileCard; 

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { updateUser } from "../Slice/UserSlice";
import { FaUserCircle, FaEnvelope, FaPhone, FaVenusMars, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const ProfileCard = () => {
  const userInfo = useSelector((state) => state.mySlice?.value || {}); // safe access
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: userInfo.firstName || "",
    lastName: userInfo.lastName || "",
    email: userInfo.email || "",
    phone: userInfo.phone || "",
    gender: userInfo.gender || "Male",
    avater: userInfo.avater || null,
  });

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // File select & preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("currentUserId", userInfo.userId);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("gender", formData.gender);

      if (file) data.append("avater", file);

      const res = await axios.post(
        "http://localhost:3000/auth/updateProfile",
        data,
        {
          headers: { Authorization: Cookies.get("token"), "Content-Type": "multipart/form-data" },
        }
      );

      // Update Redux + localStorage
      const updatedUser = {
        ...formData,
        avater: preview || formData.avater,
      };
      dispatch(updateUser(updatedUser));
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));

      // Reset
      setIsEditing(false);
      setPreview(null);
      setFile(null);
    } catch (err) {
      console.log(err);
    }
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
        <div className="w-24 h-24 rounded-full border-2 border-blue-600 mx-auto my-1 overflow-hidden">
          {preview ? (
            <img src={preview} alt="avatar" className="w-full h-full object-cover" />
          ) : formData.avater ? (
            <img src={formData.avater} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-400" />
          )}
        </div>

        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 mb-4"
          />
        )}

        {/* Name */}
        <div className="flex items-center justify-center mb-2 gap-2">
          {isEditing ? (
            <>
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
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-800">
              {formData.firstName} {formData.lastName}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-6">My Profile</p>

        {/* Info */}
        <div className="flex flex-col items-center gap-4">
          {/* Email */}
          <div className="flex items-center w-full justify-center gap-2">
            <FaEnvelope className="text-gray-400" />
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
          <div className="flex items-center w-full justify-center gap-2">
            <FaPhone className="text-gray-400" />
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
          <div className="flex items-center w-full justify-center gap-2">
            <FaVenusMars className="text-gray-400" />
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

        {/* Buttons */}
        {isEditing && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
            >
              <FaSave /> Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setPreview(null);
                setFile(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
