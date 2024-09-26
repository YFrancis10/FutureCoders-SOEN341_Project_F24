import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelection() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    navigate(`/login`, { state: { role } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Select Your Role</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => selectRole('teacher')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Teacher
          </button>
          <button
            onClick={() => selectRole('student')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
}
