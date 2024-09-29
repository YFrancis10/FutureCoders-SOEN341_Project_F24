import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/role-selection'); // Keep this as is if you want to navigate to role selection for login
  };

  const handleSignUp = () => {
    navigate('/sign-up'); // Update to navigate to the sign-up page
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-500 to-blue-400 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
          Peer Assessment Review
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-700 mb-6">
          View your peers' work and help each other achieve better work.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            onClick={handleLogin}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
          <button
            onClick={handleSignUp}
            className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-800 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}