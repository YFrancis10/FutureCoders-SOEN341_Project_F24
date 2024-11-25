import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Summary() {
    const { teamId } = useParams();
    const location = useLocation();
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teamName, setTeamName] = useState(location.state?.teamName || ''); // Get teamName from location.state if available
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch team data (ratings) and team name if not already passed
                const [teamDataResponse, teamNameResponse] = await Promise.all([
                    axios.get(`http://localhost:5001/teams/${teamId}/ratings`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    !teamName
                        ? axios.get(`http://localhost:5001/teams/${teamId}`)
                        : null, // Fetch team name only if not in state
                ]);

                setTeamData(teamDataResponse.data);

                if (teamNameResponse) {
                    setTeamName(teamNameResponse.data.teamName); // Set team name from API if it wasn't passed
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching team data:', err);
                setError('Failed to load team data');
                setLoading(false);
            }
        };

        fetchTeamData();
    }, [teamId, teamName]); // Adding teamName to dependencies ensures it doesn’t refetch if teamName is set

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <section className="p-6 rounded-lg shadow-md glass mb-6">
                    <h1 className="text-2xl font-semibold text-gray-100">
                            Team: {teamName}
                        </h1>
                        </section>
                        <section>
                        <table className="min-w-full table-auto border-collapse overflow-hidden glass text-gray-200 shadow-md">
                            <thead>
                            <tr className="bg-gray-800">
                                <th className="px-4 py-2 border-b text-center font-medium">Student ID</th>
                                <th className="px-4 py-2 border-b text-center font-medium">Last Name</th>
                                <th className="px-4 py-2 border-b text-center font-medium">First Name</th>
                                <th className="px-4 py-2 border-b text-center font-medium">Cooperation</th>
                                <th className="px-4 py-2 border-b text-center font-medium">Conceptual Contribution</th>
                                <th className="px-4 py-2 border-b text-center font-medium">Practical Contribution</th>
                                <th className="px-4 py-2 border-b text-center font-medium">Work Ethic</th>
                                <th className="px-4 py-2 border-b text-center font-medium">Average</th>
                                <th className="px-4 py-2 border-b text-center font-medium">Peers Who Responded</th>
                            </tr>
                            </thead>
                            <tbody>
                            {teamData.map((student, index) => (
                                <tr key={index} className="odd:bg-gray-700 even:bg-gray-800">
                                    <td className="px-4 py-2 border-t text-center">{student.studentID}</td>
                                    <td className="px-4 py-2 border-t text-center">{student.lastName}</td>
                                    <td className="px-4 py-2 border-t text-center">{student.firstName}</td>
                                    <td className="px-4 py-2 border-t text-center">{(student.cooperation || 0).toFixed(1)}</td>
                                    <td className="px-4 py-2 border-t text-center">{(student.conceptualContribution || 0).toFixed(1)}</td>
                                    <td className="px-4 py-2 border-t text-center">{(student.practicalContribution || 0).toFixed(1)}</td>
                                    <td className="px-4 py-2 border-t text-center">{(student.workEthic || 0).toFixed(1)}</td>
                                    <td className="px-4 py-2 border-t text-center">{(student.average || 0).toFixed(1)}</td>
                                    <td className="px-4 py-2 border-t text-center">{student.peersWhoResponded || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        </section>                           
                        <div className="mt-6 flex justify-start gap-4">
                            <button
                                onClick={() => navigate('/Teacher_Dashboard')}
                                className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:border-black transition duration-300"
                                >
                                Go Back to Teacher Dashboard
                            </button>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/teams/${teamId}/detailed-results`
                                    )
                                }
                                className="bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                                >
                                Display Detailed Results
                            </button>
                        </div>
                </main>
            </div>
        </>
    );
}

export default Summary;
