import React, { useState, useEffect } from 'react';
import { FaGooglePlusG, FaGithub } from 'react-icons/fa';
import { supabase } from '../auth/supabase';
import { useNavigate } from 'react-router-dom';
import {
  saveSessionToLocalStorage,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithGitHub,
} from '../auth/auth';

const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
        saveSessionToLocalStorage(session);
        navigate('/chat');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await signUpWithEmail(email, password, name);
    if (!error) {
      setEmail('');
      setPassword('');
      setName('');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await signInWithEmail(email, password);
    if (!error) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#c4c7f8] font-[Montserrat] relative overflow-hidden">
      <div className={`relative w-[1200px] max-w-full min-h-[630px] rounded-lg shadow-xl bg-white overflow-hidden transition-all duration-500 ease-in-out ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        
        {/* Sign Up Form */}
        <div className={`absolute top-0 h-full w-1/2 transition-all duration-500 ease-in-out ${isRightPanelActive ? 'translate-x-full opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <form onSubmit={handleSignUp} className="flex flex-col justify-center items-center px-12 h-full text-center bg-white">
            <h1 className="font-bold text-2xl mb-4">Create Account</h1>
            <div className="flex space-x-6 my-6">
              <button type="button" onClick={signInWithGoogle} className="border border-gray-300 rounded-full h-14 w-14 flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-100">
                <FaGooglePlusG />
              </button>
              <button type="button" onClick={signInWithGitHub} className="border border-gray-300 rounded-full h-14 w-14 flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-100">
                <FaGithub />
              </button>
            </div>
            <div className="flex items-center w-full my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-4 text-sm text-gray-500">or use your email for registration</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-200 p-3 my-2 w-full outline-none rounded" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 p-3 my-2 w-full outline-none rounded" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 p-3 my-2 w-full outline-none rounded" />
            <button type="submit" className="bg-[#3e3bee] text-white font-bold px-12 py-3 rounded-full text-xs uppercase mt-4">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 h-full w-1/2 z-10 transition-all duration-500 ease-in-out ${isRightPanelActive ? 'translate-x-full opacity-0 z-0' : 'opacity-100 z-10'}`}>
          <form onSubmit={handleSignIn} className="flex flex-col justify-center items-center px-12 h-full text-center bg-white">
            <h1 className="font-bold text-2xl mb-4">Sign In</h1>
            <div className="flex space-x-6 my-6">
              <button type="button" onClick={signInWithGoogle} className="border border-gray-300 rounded-full h-14 w-14 flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-100">
                <FaGooglePlusG />
              </button>
              <button type="button" onClick={signInWithGitHub} className="border border-gray-300 rounded-full h-14 w-14 flex items-center justify-center text-2xl text-gray-700 hover:bg-gray-100">
                <FaGithub />
              </button>
            </div>
            <div className="flex items-center w-full my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-4 text-sm text-gray-500">or use your account</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 p-3 my-2 w-full outline-none rounded" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 p-3 my-2 w-full outline-none rounded" />
            <a href="#" className="text-sm text-gray-500 mt-2">Forgot your password?</a>
            <button type="submit" className="bg-[#3e3bee] text-white font-bold px-12 py-3 rounded-full text-xs uppercase mt-4">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-20 ${isRightPanelActive ? '-translate-x-full' : 'translate-x-0'}`}>
          <div
            className="bg-gradient-to-r from-[#4b48e7] to-[#3e3bee] text-white absolute left-[-100%] w-[200%] h-full transform transition-transform duration-500 ease-in-out"
            style={{ transform: isRightPanelActive ? 'translateX(50%)' : 'translateX(0)' }}
          >
            <div className={`absolute flex flex-col items-center justify-center px-10 text-center h-full w-1/2 transition-transform duration-500 ease-in-out ${isRightPanelActive ? 'translate-x-0' : '-translate-x-1/5'}`}>
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-sm mt-4">To keep connected with us please login with your personal info</p>
              <button onClick={() => setIsRightPanelActive(false)} className="mt-6 border border-white px-10 py-2 rounded-full uppercase text-sm font-bold bg-transparent">
                Sign In
              </button>
            </div>
            <div className={`absolute right-0 flex flex-col items-center justify-center px-10 text-center h-full w-1/2 transition-transform duration-500 ease-in-out ${isRightPanelActive ? 'translate-x-1/5' : 'translate-x-0'}`}>
              <h1 className="text-2xl font-bold">Hello, Friend!</h1>
              <p className="text-sm mt-4">Enter your personal details and start your journey with us</p>
              <button onClick={() => setIsRightPanelActive(true)} className="mt-6 border border-white px-10 py-2 rounded-full uppercase text-sm font-bold bg-transparent">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
