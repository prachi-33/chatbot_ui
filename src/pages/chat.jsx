import React from 'react';
import { signOut } from "../auth/auth";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();     // Wait for sign out to complete
    navigate('/');       // Then navigate to home or login
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex flex-col relative font-[Montserrat]">
      {/* Sign Out button */}
      <div className="absolute top-4 right-6">
        <button
          onClick={handleSignOut}
          className="bg-[#3e3bee] hover:bg-[#2f2cc5] text-white font-semibold px-6 py-2 rounded-full text-sm shadow-lg transition-all duration-300"
        >
          Sign Out
        </button>
      </div>

      {/* Chat Page Content */}
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-3xl font-bold text-[#3e3bee] mb-4">Chat Page</h1>
        <p className="text-gray-600">Your chat interface goes here...</p>
      </div>
    </div>
  );
};

export default Chat;

