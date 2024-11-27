import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherDashboard = () => {
    const [teacher, setTeacher] = useState(null);
    const [teams, setTeams] = useState([]);
    const [commentsVisible, setCommentsVisible] = useState(false); // Add this state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:5001/teacher/me',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setTeacher(response.data);

                const teamsResponse = await axios.get(
                    'http://localhost:5001/teacher/teams',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setTeams(teamsResponse.data);

                // Fetch initial visibility state from backend
                const visibilityResponse = await axios.get(
                    'http://localhost:5001/comments-visibility',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setCommentsVisible(visibilityResponse.data.visible);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeacherData();
    }, []);

    /* const toggleCommentsVisibility = async () => {
        try {
            const token = localStorage.getItem('token');
            const newVisibility = !commentsVisible;

            await axios.post(
                'http://localhost:5001/comments-visibility',
                { visible: newVisibility },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setCommentsVisible(newVisibility); // Update state
        } catch (error) {
            console.error('Error toggling comments visibility:', error);
            alert('Failed to update comments visibility');
        }
    };
 */
    const handleCreateTeam = () => {
        navigate('/Teams');
    };

    const handleDeleteTeam = async (teamId, teamName) => {
        if (
            window.confirm(
                `Are you sure you want to delete the team "${teamName}"?`
            )
        ) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5001/teams/${teamId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTeams(teams.filter((team) => team.id !== teamId));
                alert('Team deleted successfully');
            } catch (error) {
                console.error('Error deleting team:', error);
                alert('Failed to delete the team');
            }
        }
    };

    if (!teacher) {
        return <p className="text-center text-gray-600 mt-10">Loading...</p>;
    }

    return (
        <div className="">
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Teacher Info */}
                <section className="p-6 rounded-lg shadow-md mb-6 glass">
                    <h2 className="text-lg font-semibold text-gray-100">
                        Welcome, {teacher.firstName} {teacher.lastName}
                    </h2>
                    <p className="text-gray-300">Email: {teacher.email}</p>
                    <p className="text-gray-300">Role: {teacher.role}</p>

                    {/* Add Comments Visibility Switch */}
                    {/* <div className="mt-4">
                        <label className="text-gray-300">
                            Enable Anonymous Comments Visibility:
                        </label>
                        <input
                            type="checkbox"
                            checked={commentsVisible}
                            onChange={toggleCommentsVisibility}
                            className="ml-2"
                        />
                    </div> */}
                </section>

                {/* Teams Section */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">
                        Your Teams
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <div
                                    key={team.id}
                                    className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 glass"
                                >
                                    <h3 className="text-lg font-medium text-gray-100 mb-2">
                                        {team.name}
                                    </h3>
                                    <p className="text-gray-300 mb-3">
                                        Students:
                                        {team.students.length > 0 ? (
                                            <ul className="list-disc list-inside ml-4 text-gray-200">
                                                {team.students.map((s) => (
                                                    <li key={s._id}>
                                                        {s.firstName} {s.lastName}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="text-gray-500">
                                                No students in this team.
                                            </span>
                                        )}
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() =>
                                                navigate(`/summary/${team.id}`, {
                                                    state: { teamName: team.name },
                                                })
                                            }
                                            className="bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                                        >
                                            Display Team's Results
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigate(`/editTeam/${team.id}`)
                                                } className="rounded-md bg-yellow-500 text-white px-4 py-2 text-sm font-medium"
                                        >
                                            Edit Team
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTeam(team.id, team.name)}
                                            className="bg-white text-black px-4 py-2 rounded-md border border-transparent hover:border-black transition duration-300"
                                        >
                                            Delete Team
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300">No teams found.</p>
                        )}
                    </div>
                </section>

                {/* Create Team and Logout */}
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleCreateTeam}
                        className="px-4 py-2 bg-white text-black rounded-md text-lg hover:bg-green-600 hover:border-black transition duration-300"
                    >
                        + Create a new team
                    </button>
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;
