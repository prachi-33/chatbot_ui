import React, { useState } from 'react';
import { signOut } from "../auth/auth";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setMessages([...messages, { text: url, sender: "user", type }]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen font-sans bg-[#0f172a]">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-[#111827] text-[#f1f5f9] flex flex-col p-4 shadow-md transition-all duration-300">
          <div className="mb-6">
            <span className="text-4xl italic font-serif font-bold tracking-wide text-[#7dd3fc]">Sarah</span>
          </div>

          <button className="bg-[#38bdf8] text-white font-medium py-2 px-4 rounded-full mb-4 hover:bg-[#0ea5e9] transition-all">
            + New Chat
          </button>

          <div className="flex-1 overflow-y-auto">
            <p className="py-2 px-3 rounded hover:bg-[#334155] cursor-pointer">Chat 1</p>
            <p className="py-2 px-3 rounded hover:bg-[#334155] cursor-pointer">Chat 2</p>
          </div>

          <button
            onClick={handleSignOut}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition-all font-medium"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-10 bg-[#1e293b] text-white px-3 py-1 rounded-full hover:bg-[#334155] shadow"
        >
          {sidebarOpen ? '<' : '>'}
        </button>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#1e1b4b]">
          {messages.length === 0 ? (
            <div className="text-center text-[#64748b] mt-40 text-5xl italic opacity-40">
              Start chatting...
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-xl ${msg.sender === "user" ? "ml-auto text-right" : ""}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg shadow ${
                    msg.sender === "user"
                      ? "bg-[#38bdf8] text-white"
                      : "bg-[#334155] text-white"
                  }`}
                >
                  {msg.type === "image" ? (
                    <img src={msg.text} alt="uploaded" className="max-w-xs rounded" />
                  ) : msg.type === "pdf" ? (
                    <a
                      href={msg.text}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      View PDF
                    </a>
                  ) : (
                    <span>{msg.text}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat Input Area */}
        <div className="bg-[#0f172a] border-t border-[#334155] p-4 shadow-inner">
          {/* Text input and send button */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message or paste URL..."
              className="flex-1 px-4 py-2 rounded-full border border-[#475569] bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-white px-6 py-2 rounded-full transition-all font-medium"
            >
              Send
            </button>
          </div>

          {/* Upload Options */}
          <div className="mt-4 flex justify-center gap-6">
            <label className="flex items-center gap-2 bg-[#334155] text-white hover:bg-[#475569] px-4 py-2 rounded-full cursor-pointer shadow transition-all font-medium">
              📷 Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "image")}
              />
            </label>

            <label className="flex items-center gap-2 bg-[#334155] text-white hover:bg-[#475569] px-4 py-2 rounded-full cursor-pointer shadow transition-all font-medium">
              📄 Upload PDF
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "pdf")}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;