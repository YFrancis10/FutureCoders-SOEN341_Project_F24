import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmSubmission = () => {
  const navigate = useNavigate();

  const goBackToDashboard = () => {
    navigate('/Student_Dashboard');  // Redirect back to the student's dashboard
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">Submission Confirmed!</h2>
      <p className="mb-6">Thank you for submitting your peer assessment.</p>

      <button
        onClick={goBackToDashboard}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ConfirmSubmission;
