import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PeerRating = () => {
    const { teamId, studentId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {
        teammate,
        remainingTeammates = [],
        teamName,
    } = location.state || {};

    const [cooperation, setCooperation] = useState('');
    const [conceptualContribution, setConceptualContribution] = useState('');
    const [practicalContribution, setPracticalContribution] = useState('');
    const [workEthic, setWorkEthic] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const ratingOptions = [
        { value: 1, label: 'Poor' },
        { value: 2, label: 'Fair' },
        { value: 3, label: 'Good' },
        { value: 4, label: 'Very Good' },
        { value: 5, label: 'Excellent' },
    ];

    const submitRating = async () => {
        if (
            !cooperation ||
            !conceptualContribution ||
            !practicalContribution ||
            !workEthic
        ) {
            setError('Please select a valid rating for all dimensions (1-5).');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            await axios.post(
                `http://localhost:5001/teams/${teamId}/ratings`,
                {
                    rateeId: studentId,
                    cooperation,
                    conceptualContribution,
                    practicalContribution,
                    workEthic,
                    comment,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            navigate('/cooperation', {
                state: {
                    updatedTeammates: remainingTeammates.filter(
                        (t) => t._id !== studentId
                    ),
                    teamId,
                    teamName,
                },
            });
        } catch (error) {
            console.error('Error submitting rating:', error);
            setError('Failed to submit rating. Please try again.');
        }
    };

    return (
        <div className="">
            <main className="ml-0">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="w-full flex flex-col">
                        <div className="mt-6 w-1/2">
                            <h2 className="text-3xl font-bold mb-4 text-gray-100">
                                Rate{' '}
                                {teammate
                                    ? `${teammate.firstName} ${teammate.lastName}`
                                    : 'Teammate'}
                            </h2>

                            {/* Cooperation Rating */}
                            <div className="mb-4">
                                <label
                                    htmlFor="cooperation"
                                    className="text-lg font-semibold text-gray-300"
                                >
                                    Cooperation
                                </label>
                                <select
                                    id="cooperation"
                                    value={cooperation}
                                    onChange={(e) =>
                                        setCooperation(e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Rating</option>
                                    {ratingOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Conceptual Contribution Rating */}
                            <div className="mb-4">
                                <label
                                    htmlFor="conceptualContribution"
                                    className="text-lg font-semibold text-gray-300"
                                >
                                    Conceptual Contribution
                                </label>
                                <select
                                    id="conceptualContribution"
                                    value={conceptualContribution}
                                    onChange={(e) =>
                                        setConceptualContribution(
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Rating</option>
                                    {ratingOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Practical Contribution Rating */}
                            <div className="mb-4">
                                <label
                                    htmlFor="practicalContribution"
                                    className="text-lg font-semibold text-gray-300"
                                >
                                    Practical Contribution
                                </label>
                                <select
                                    id="practicalContribution"
                                    value={practicalContribution}
                                    onChange={(e) =>
                                        setPracticalContribution(
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Rating</option>
                                    {ratingOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Work Ethic Rating */}
                            <div className="mb-4">
                                <label
                                    htmlFor="workEthic"
                                    className="text-lg font-semibold text-gray-300"
                                >
                                    Work Ethic
                                </label>
                                <select
                                    id="workEthic"
                                    value={workEthic}
                                    onChange={(e) => setWorkEthic(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Rating</option>
                                    {ratingOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Comment */}
                            <div className="mb-4">
                                <label
                                    htmlFor="comment"
                                    className="text-lg font-semibold text-gray-300"
                                >
                                    Comments
                                </label>
                                <textarea
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    rows={4}
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="mt-6 flex gap-4">
                            <button
                                onClick={submitRating}
                                className="bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                            >
                                Submit Rating
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PeerRating;
