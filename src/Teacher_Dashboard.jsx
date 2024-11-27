import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Switch from '@mui/material/Switch';

const TeacherDashboard = () => {
    const [teacher, setTeacher] = useState(null);
    const [teams, setTeams] = useState([]);
    const [commentsVisible, setCommentsVisible] = useState(false); // State for the switch
    const navigate = useNavigate();

    // Fetch teacher details, teams, and the visibility status on page load
    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const token = localStorage.getItem('token');
                const teacherResponse = await axios.get(
                    'http://localhost:5001/teacher/me',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTeacher(teacherResponse.data);

                const teamsResponse = await axios.get(
                    'http://localhost:5001/teacher/teams',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTeams(teamsResponse.data);

                const visibilityResponse = await axios.get(
                    'http://localhost:5001/comments-visibility-status',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCommentsVisible(visibilityResponse.data.visible); // Set initial state of the switch
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeacherData();
    }, []);

    // Handle creating a new team
    const handleCreateTeam = () => {
        navigate('/Teams');
    };

    // Handle deleting a team
    const handleDeleteTeam = async (teamId, teamName) => {
        if (window.confirm(`Are you sure you want to delete the team "${teamName}"?`)) {
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

    // Handle toggling the comments visibility switch

    const handleToggleDisplayResults = async () => {
        try {
            const token = localStorage.getItem('token');
            const newState = !commentsVisible; // Toggle the visibility
            await axios.post(
                'http://localhost:5001/comments-visibility',
                { visible: newState },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCommentsVisible(newState); // Update state locally
            alert(
                `Comments visibility has been ${
                    newState ? 'enabled' : 'disabled'
                } successfully!`
            );
        } catch (error) {
            console.error('Error toggling comments visibility:', error);
            alert('Failed to update comments visibility');
        }
    };
    
    <div className="mt-6 flex justify-between items-center">
        <button
            onClick={handleCreateTeam}
            className="px-4 py-2 bg-white text-black rounded-md text-lg hover:bg-green-600 hover:border-black transition duration-300"
        >
            + Create a new team
        </button>
    
        {/* Comments Visibility Switch */}
        <div className="flex items-center">
            <span className="text-white mr-4">Enable Comments Visibility</span>
            <Switch
                checked={commentsVisible}
                onChange={handleToggleDisplayResults}
                color="primary"
            />
        </div>
    </div>;

    if (!teacher) {
        return <p className="text-center text-gray-600 mt-10">Loading...</p>;
    }

    return (
        <div className="">
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Teacher Info Section */}
                <section className="p-6 rounded-lg shadow-md mb-6 glass">
                    <h2 className="text-lg font-semibold text-gray-100">
                        Welcome, {teacher.firstName} {teacher.lastName}
                    </h2>
                    <p className="text-gray-300">Email: {teacher.email}</p>
                    <p className="text-gray-300">Role: {teacher.role}</p>
                </section>

                {/* Teams Section */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">Your Teams</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <div
                                    key={team.id}
                                    className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 glass flex flex-col justify-between"
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
                                    <div className="flex-grow"></div>
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

                {/* Create Team Button */}
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleCreateTeam}
                        className="px-4 py-2 bg-white text-black rounded-md text-lg hover:bg-green-600 hover:border-black transition duration-300"
                    >
                        + Create a new team
                    </button>
                </div>

                <br />

                {/* Comments Visibility Switch */}
                <div className="flex items-center justify-start mt-4 space-x-4">
                    <p className="text-white">
                        {commentsVisible
                            ? 'Results and anonymous comments to the students enabled'
                            : 'Results and anonymous comments to the students disabled'}
                    </p>
                    <Switch
                        checked={commentsVisible}
                        onChange={handleToggleDisplayResults}
                        sx={{
                            '& .MuiSwitch-thumb': {
                                backgroundColor: commentsVisible ? 'black' : 'white',
                            },
                            '& .MuiSwitch-track': {
                                backgroundColor: commentsVisible ? 'white' : 'black',
                            },
                        }}
                    />
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;
