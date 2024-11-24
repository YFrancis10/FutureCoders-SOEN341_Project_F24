import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TeamEvaluation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { team, student } = location.state || {};

    const [selectedTeammates, setSelectedTeammates] = useState([]);

    const handleTeammateChange = (e, teammate) => {
        const { checked } = e.target;
        if (checked) {
            setSelectedTeammates([...selectedTeammates, teammate]);
        } else {
            setSelectedTeammates(
                selectedTeammates.filter((t) => t._id !== teammate._id)
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const goBackHome = () => {
        navigate('/Student_Dashboard');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedTeammates.length === 0) {
            alert('Please select at least one teammate.');
            return;
        }

        const teamId = team._id;

        navigate('/Cooperation', {
            state: {
                selectedTeammates,
                teamName: team.name,
                teamId,
            },
        });
    };

    return (
        <div className="">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                <section className="p-6 rounded-lg shadow-md glass mb-6">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">
                        Evaluate Team: {team.name}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-lg text-gray-100 mb-4">
                            Select teammates to evaluate (you cannot rate
                            yourself):
                        </h3>
                        {team.students
                            .filter((teammate) => teammate._id !== student._id)
                            .map((teammate) => (
                                <div key={teammate._id} className="mb-3">
                                    <label className="flex items-center text-gray-300">
                                        <input
                                            type="checkbox"
                                            onChange={(e) =>
                                                handleTeammateChange(
                                                    e,
                                                    teammate
                                                )
                                            }
                                            className="mr-2 rounded text-black"
                                        />
                                        {teammate.firstName} {teammate.lastName}
                                    </label>
                                </div>
                            ))}

                        <div className="flex space-x-4 mt-6">
                            <button
                                type="button"
                                onClick={goBackHome}
                                className="bg-white text-black px-4 py-2 rounded-md border border-transparent hover:border-black transition duration-300"
                            >
                                Go back
                            </button>
                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                            >
                                Submit Evaluation
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default TeamEvaluation;
