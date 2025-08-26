import React from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";

const users = [
  { id: 1, name: "Alice Johnson", lastMessage: "Hey! How are you?", time: "10:45 AM", unread: 2 },
  { id: 2, name: "Bob Smith", lastMessage: "See you tomorrow!", time: "Yesterday", unread: 0 },
  { id: 3, name: "Charlie Brown", lastMessage: "Typing...", time: "11:20 AM", unread: 5 },
  { id: 4, name: "David Miller", lastMessage: "Good night ✨", time: "Sun", unread: 0 },
  { id: 5, name: "Emma Wilson", lastMessage: "Let’s catch up soon.", time: "Mon", unread: 1 },
];

const ChatUserList = ({ onSelectUser }) => {
  return (
    <div className="w-full md:w-1/4 h-screen border-r bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b bg-gray-100">
        <div className="flex items-center">
          <span className="ml-2 font-semibold text-gray-700 text-xl">My Chats</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => onSelectUser(user)}
          >
            <div className="flex items-center">
              <FaUserCircle className="text-4xl text-gray-500 mr-3" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{user.name}</span>
                <span className="text-sm text-gray-500 truncate w-40">
                  {user.lastMessage}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">{user.time}</span>
              {user.unread > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 mt-1">
                  {user.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUserList;
