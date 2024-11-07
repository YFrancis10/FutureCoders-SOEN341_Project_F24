import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ConceptualContribution = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get selectedTeammates, teamName, teamId, and updatedTeammates from location state
  const { selectedTeammates = [], teamName = '', teamId, updatedTeammates } = location.state || {};

  // Initialize remainingTeammates with updatedTeammates if available, otherwise use selectedTeammates
  const [remainingTeammates, setRemainingTeammates] = useState(updatedTeammates || selectedTeammates);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleGoBack = () => {
    navigate(`/Student_Dashboard`);
  };

  const handleRateTeammate = (teammate) => {
    navigate(`/PeerRating2/${teamId}/${teammate._id}`, {
      state: {
        teammate,
        remainingTeammates: remainingTeammates.filter((t) => t._id !== teammate._id),
        teamId,
        teamName, // Ensure teamName is included
      },
    });
  };

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Team {teamName}: Conceptual Contribution Evaluation
          </h1>
        </div>
      </header>

      <main>
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Rate your teammates:</h1>
            {remainingTeammates.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {remainingTeammates.map(teammate => (
                  <li key={teammate._id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-lg">{teammate.firstName} {teammate.lastName}</span>
                    <button onClick={() => handleRateTeammate(teammate)} className="inline-flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-2 text-lg transform transition-transform duration-200 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-500 hover:scale-105">Rate</button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center text mt-8 bg-gray-100 p-6 border border-gray-200 rounded-lg shadow-lg max-w-xl mx-auto">
                <h3 className="text-2xl font-bold mb-2">Submission Confirmed</h3>
                <p>All teammates have been rated!</p>
                <p className="text-lg">Thank you for submitting your conceptual contribution peer assessment.</p>
              </div>
            )}
            <button onClick={handleGoBack} className="mt-6 inline-flex items-center justify-center rounded-md bg-gray-200 text-black px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-transform transform hover:scale-105">Go Back to Student Dashboard</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConceptualContribution;
