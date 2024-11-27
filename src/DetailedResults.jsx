// import React, { useState, useEffect } from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const userNavigation = [
//     { name: 'Your Profile', href: '#' },
//     { name: 'Settings', href: '#' },
// ];

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }

// const DetailedResults = () => {
//     const { teamId } = useParams();
//     const navigate = useNavigate();
//     const [teamName, setTeamName] = useState('');
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(
//                     `http://localhost:5001/teams/${teamId}/detailed-results`,
//                     {
//                         headers: { Authorization: `Bearer ${token}` },
//                     }
//                 );
//                 const { teamName, students } = response.data;
//                 setTeamName(teamName);
//                 setStudents(students);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching detailed view data:', error);
//                 setError('Failed to load team details.');
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [teamId]);

//     if (loading) {
//         return <p>Loading...</p>;
//     }
//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div className="">
//             <main className="container mx-auto p-6">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                     Team: {teamName}
//                 </h2>

//                 {students.map((student, index) => (
//                     <div
//                         key={index}
//                         className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8"
//                     >
//                         <h3 className="text-lg font-bold text-gray-800 mb-4">
//                             {student.name}
//                         </h3>

//                         <table className="min-w-full bg-white border border-gray-300 mb-4">
//                             <thead>
//                                 <tr>
//                                     <th className="py-2 px-4 border text-center">
//                                         Rater ID
//                                     </th>
//                                     <th className="py-2 px-4 border text-center">
//                                         Rater Name
//                                     </th>
//                                     <th className="py-2 px-4 border text-center">
//                                         Cooperation
//                                     </th>
//                                     <th className="py-2 px-4 border text-center">
//                                         Conceptual
//                                     </th>
//                                     <th className="py-2 px-4 border text-center">
//                                         Practical
//                                     </th>
//                                     <th className="py-2 px-4 border text-center">
//                                         Work Ethic
//                                     </th>
//                                     <th className="py-2 px-4 border text-center">
//                                         Average
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {student.ratings.map((rating, rIndex) => (
//                                     <tr
//                                         key={rIndex}
//                                         className="hover:bg-gray-100"
//                                     >
//                                         <td className="px-4 py-2 border text-center">
//                                             {rating.raterID || 'N/A'}
//                                         </td>
//                                         <td className="px-4 py-2 border text-center">
//                                             {rating.raterName}
//                                         </td>
//                                         <td className="px-4 py-2 border text-center">
//                                             {rating.score.cooperation ||
//                                                 'No rating'}
//                                         </td>
//                                         <td className="px-4 py-2 border text-center">
//                                             {rating.score
//                                                 .conceptualContribution ||
//                                                 'No rating'}
//                                         </td>
//                                         <td className="px-4 py-2 border text-center">
//                                             {rating.score
//                                                 .practicalContribution ||
//                                                 'No rating'}
//                                         </td>
//                                         <td className="px-4 py-2 border text-center">
//                                             {rating.score.workEthic ||
//                                                 'No rating'}
//                                         </td>
//                                         <td className="px-4 py-2 border text-center">
//                                             {(
//                                                 (rating.score.cooperation +
//                                                     rating.score
//                                                         .conceptualContribution +
//                                                     rating.score
//                                                         .practicalContribution +
//                                                     rating.score.workEthic) /
//                                                 4
//                                             ).toFixed(2) || 'No rating'}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         <div>
//                             <h4 className="text-lg font-semibold text-gray-800">
//                                 Comments:
//                             </h4>
//                             {student.ratings.map((rating, rIndex) => (
//                                 <p key={rIndex} className="text-gray-700">
//                                     {rating.raterName} (ID: {rating.raterID}):{' '}
//                                     {rating.comment || '(No comment)'}
//                                 </p>
//                             ))}
//                         </div>
//                     </div>
//                 ))}

//                 <div className="mt-6 flex gap-x-4">
//                     <Link
//                         to="/Teacher_Dashboard"
//                         className="inline-flex items-center justify-center rounded-md bg-gray-200 text-black px-4 py-3 text-base hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
//                     >
//                         Go Back to Teacher Dashboard
//                     </Link>
//                     <button
//                         onClick={() =>
//                             navigate(`/summary/${teamId}`, {
//                                 state: { teamName },
//                             })
//                         }
//                         className="inline-flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-3 text-base transform transition-transform duration-200 hover:from-blue-600 hover:to-blue-500 hover:scale-105"
//                     >
//                         Display Summarized Results
//                     </button>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default DetailedResults;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailedResults = () => {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:5001/teams/${teamId}/detailed-results`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const { teamName, students } = response.data;
                setTeamName(teamName);
                setStudents(students);
            } catch (error) {
                console.error('Error fetching detailed view data:', error);
                setError('Failed to load team details.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [teamId]);

    if (loading) {
        return <p className="text-center mt-10 text-white">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h2 className="text-3xl font-bold text-gray-100 mb-6">
                    Team: {teamName}
                </h2>

                {students.map((student, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-lg shadow-md border border-gray-200 mb-6 hover:bg-black transition duration-150 ease-in-out glass"
                    >
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            {student.name}
                        </h3>
                        <table className="min-w-full bg-white rounded-md mb-4 text-black">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border text-center">Rater ID</th>
                                    <th className="py-2 px-4 border text-center">Rater Name</th>
                                    <th className="py-2 px-4 border text-center">Cooperation</th>
                                    <th className="py-2 px-4 border text-center">Conceptual</th>
                                    <th className="py-2 px-4 border text-center">Practical</th>
                                    <th className="py-2 px-4 border text-center">Work Ethic</th>
                                    <th className="py-2 px-4 border text-center">Average</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.ratings.map((rating, rIndex) => (
                                    <tr key={rIndex} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border text-center">
                                            {rating.raterID || 'N/A'}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {rating.raterName}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {rating.score.cooperation || 'No rating'}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {rating.score.conceptualContribution || 'No rating'}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {rating.score.practicalContribution || 'No rating'}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {rating.score.workEthic || 'No rating'}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {(
                                                (rating.score.cooperation +
                                                    rating.score.conceptualContribution +
                                                    rating.score.practicalContribution +
                                                    rating.score.workEthic) /
                                                4
                                            ).toFixed(2) || 'No rating'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h4 className="text-lg font-semibold">
                            Comments:
                        </h4>
                        {student.ratings.map((rating, rIndex) => (
                            <p key={rIndex} className="text-white">
                                {rating.raterName} (ID: {rating.raterID}):{' '}
                                {rating.comment || '(No comment)'}
                            </p>
                        ))}
                    </div>
                ))}

                <div className="mt-6 flex gap-4">
                    <Link
                        to="/Teacher_Dashboard"
                        className="px-4 py-2 bg-white text-black rounded-md border border-transparent hover:border-black hover:bg-gray-300 hover:text-black transition duration-300"
                    >
                        Go Back to Teacher Dashboard
                    </Link>
                    <button
                        data-testid="mess"
                        onClick={() =>
                            navigate(`/summary/${teamId}`, {
                                state: { teamName },
                            })
                        }
                        className="bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                        >
                        Display Summarized Results
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailedResults;
