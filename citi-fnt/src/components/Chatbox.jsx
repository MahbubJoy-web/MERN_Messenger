import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaPaperPlane } from "react-icons/fa";

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you?", sender: "them", time: "10:30 AM" },
    { id: 2, text: "I’m good, thanks! You?", sender: "me", time: "10:32 AM" },
    { id: 3, text: "Doing great! Working on a project 🚀", sender: "them", time: "10:35 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const handleSend = () => {
    if (newMessage.trim() === "") return;
    const msg = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  if (user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Select a user to start chatting</p>
      </div>
    );
  }

return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b bg-gray-100 shadow-sm">
        <FaUserCircle className="text-3xl text-gray-500 mr-3" />
        <div>
          <h2 className="font-semibold text-gray-800">{'Mahbub'}</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-3 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm ${
                msg.sender === "me"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-xs text-gray-300 mt-1 text-right">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="ml-3 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
