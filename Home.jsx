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
    <div className="relative bg-white min-h-screen">
      <div className="relative mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Peer Assessment Review
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-700">
          View your peers' work and help each other achieve better work.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
          <button
            onClick={handleLogin}
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
          >
            Log In
          </button>
          <button
            onClick={handleSignUp}
            className="text-sm font-semibold leading-6 text-gray-900">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
