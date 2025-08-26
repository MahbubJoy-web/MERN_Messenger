import React, { memo } from "react";
import { FaUserCircle, FaCommentDots } from "react-icons/fa";

// 🔹 Static user data (can come from API later)
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@mail.com", status: "online" },
  { id: 2, name: "Bob Smith", email: "bob@mail.com", status: "offline" },
  { id: 3, name: "Charlie Brown", email: "charlie@mail.com", status: "online" },
  { id: 4, name: "David Miller", email: "david@mail.com", status: "offline" },
  { id: 5, name: "Emma Wilson", email: "emma@mail.com", status: "online" },
];

// 🔹 Reusable User Card
const UserCard = memo(({ user, onSelectUser }) => {
  const isOnline = user.status === "online";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition">
      {/* Avatar */}
      <FaUserCircle className="text-5xl text-gray-400 mb-2" />

      {/* Name & Email */}
      <h3 className="font-semibold text-gray-800">{user.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{user.email}</p>

      {/* Status */}
      <span
        className={`text-xs font-medium mb-3 ${
          isOnline ? "text-green-500" : "text-red-400"
        }`}
      >
        {isOnline ? "Online" : "Offline"}
      </span>

      {/* Chat Button */}
      <button
        onClick={() => onSelectUser(user)}
        className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
      >
        <FaCommentDots className="mr-1" />
        Chat
      </button>
    </div>
  );
});

const AllUser = ({ onSelectUser }) => {
  return (
    <div className="flex-1 h-screen bg-gray-50 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">All Users</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onSelectUser={onSelectUser} />
        ))}
      </div>
    </div>
  );
};

export default AllUser;
