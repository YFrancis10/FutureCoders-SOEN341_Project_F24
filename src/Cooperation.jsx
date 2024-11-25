import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Cooperation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        selectedTeammates = [],
        teamName = '',
        teamId,
        updatedTeammates,
    } = location.state || {};
    const [remainingTeammates, setRemainingTeammates] = useState(
        updatedTeammates || selectedTeammates
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleGoBack = () => {
        navigate(`/Student_Dashboard`);
    };

    const handleRateTeammate = (teammate) => {
        navigate(`/PeerRating/${teamId}/${teammate._id}`, {
            state: {
                teammate,
                remainingTeammates: remainingTeammates.filter(
                    (t) => t._id !== teammate._id
                ),
                teamId,
                teamName,
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">
            {/* Page Header */}
            <div className=" mt-6 max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-100">
                    Team Evaluation: {teamName}
                </h1>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                <h2 className="text-xl font-semibold mb-4">
                    Rate Your Teammates
                </h2>
                {remainingTeammates.length > 0 ? (
                    <ul className="space-y-6">
                        {remainingTeammates.map((teammate) => (
                            <li
                                key={teammate._id}
                                className="p-4 rounded-lg shadow-md border border-gray-200 glass flex justify-between items-center"
                            >
                                <span className="text-lg">
                                    {teammate.firstName} {teammate.lastName}
                                </span>
                                <button
                                    onClick={() => handleRateTeammate(teammate)}
                                    className="bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                                >
                                    Rate
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
                        <h3 className="text-2xl font-bold mb-2 text-gray-100">
                            Submission Confirmed!
                        </h3>
                        <p className="text-lg text-gray-300">
                            All teammates have been rated. Thank you for your
                            submission!
                        </p>
                    </div>
                )}

                <button
                    onClick={handleGoBack}
                    className="mt-6 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 border border-transparent hover:border-black transition"
                >
                    Back to Dashboard
                </button>
            </main>
        </div>
    );
};

export default Cooperation;
