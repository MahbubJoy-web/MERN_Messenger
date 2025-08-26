import React, { memo } from "react";
import { FaUserCircle, FaUnlock } from "react-icons/fa";

// 🔹 Example blocked users (can be from API/database)
const blockedUsers = [
  { id: 1, name: "Sophia Taylor", email: "sophia@mail.com", status: "blocked" },
  { id: 2, name: "Liam Anderson", email: "liam@mail.com", status: "blocked" },
  { id: 3, name: "Olivia White", email: "olivia@mail.com", status: "blocked" },
  { id: 4, name: "James Brown", email: "james@mail.com", status: "blocked" },
];

// 🔹 Reusable Blocked User Card
const BlockCard = memo(({ user, onUnblock }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition">
      {/* Avatar */}
      <FaUserCircle className="text-5xl text-gray-400 mb-2" />

      {/* Name & Email */}
      <h3 className="font-semibold text-gray-800">{user.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{user.email}</p>

      {/* Status */}
      <span className="text-xs font-medium text-red-500 mb-3">Blocked</span>

      {/* Unblock Button */}
      <button
        onClick={() => onUnblock(user)}
        className="flex items-center bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition"
      >
        <FaUnlock className="mr-1" />
        Unblock
      </button>
    </div>
  );
});

const BlockUser = ({ onUnblock }) => {
  return (
    <div className="flex-1 h-screen bg-gray-50 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Blocked Users</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {blockedUsers.map((user) => (
          <BlockCard key={user.id} user={user} onUnblock={onUnblock} />
        ))}
      </div>
    </div>
  );
};

export default BlockUser;
