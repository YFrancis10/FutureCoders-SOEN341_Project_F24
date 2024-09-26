import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelection() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    navigate(`/login`, { state: { role } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
      <button
        onClick={() => selectRole('teacher')}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        Teacher
      </button>
      <button
        onClick={() => selectRole('student')}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Student
      </button>
    </div>
  );
}
