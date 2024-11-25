import React, { useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [{ name: 'Dashboard', href: '#', current: true }];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

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
                            <label className="text-lg font-semibold text-gray-300">
                                Cooperation
                            </label>
                            <select
                                value={cooperation}
                                onChange={(e) => setCooperation(e.target.value)}
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

                            {/* Conceptual Contribution Rating */}
                            <label className="text-lg font-semibold text-gray-300 mt-4">
                                Conceptual Contribution
                            </label>
                            <select
                                value={conceptualContribution}
                                onChange={(e) =>
                                    setConceptualContribution(e.target.value)
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

                            {/* Practical Contribution Rating */}
                            <label className="text-lg font-semibold text-gray-300 mt-4">
                                Practical Contribution
                            </label>
                            <select
                                value={practicalContribution}
                                onChange={(e) =>
                                    setPracticalContribution(e.target.value)
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

                            {/* Work Ethic Rating */}
                            <label className="text-lg font-semibold text-gray-300 mt-4">
                                Work Ethic
                            </label>
                            <select
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

                            {/* Comment */}
                            <label className="text-lg font-semibold text-gray-300 mt-4">
                                Comments
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows={4}
                            />

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={submitRating}
                                className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-lg font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PeerRating;
