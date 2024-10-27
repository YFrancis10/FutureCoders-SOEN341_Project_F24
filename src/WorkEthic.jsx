import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';

const WorkEthic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedTeammates = [], teamName = '', teamId } = location.state || {};
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleGoBack = () => {
    navigate(`/Student_Dashboard`);
  };

  const handleRate = (teammate) => {
    navigate(`/PeerRating/WorkEthic/${teamId}/${teammate._id}`, { state: { teammate } });
  };

  return (
    <>
      {/* Same layout as Cooperation, with title change */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Team Work Ethic Evaluation</h1>
        </div>
      </header>
      <main className="ml-0">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-2xl py-6 px-4">
            <h2 className="text-3xl font-bold mb-4">Team: {teamName || 'N/A'}</h2>
            <div>
              {selectedTeammates.length > 0 ? (
                selectedTeammates.map((teammate, index) => (
                  <div key={index} className="mb-2">
                    <span className="text-lg font-medium text-gray-700">
                      {teammate.firstName} {teammate.lastName}
                    </span>
                    <button
                      onClick={() => handleRate(teammate)}
                      className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
                    >
                      Rate
                    </button>
                    <hr className="border-gray-300 my-4" />
                  </div>
                ))
              ) : (
                <p>No teammates available</p>
              )}
            </div>
            <button onClick={handleGoBack} className="rounded-md bg-gray-200 text-black px-4 py-2 hover:bg-gray-300">
              Go Back to Student Dashboard
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default WorkEthic;
