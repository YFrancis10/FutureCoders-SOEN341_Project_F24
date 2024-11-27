import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTeam = () => {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState({ name: '', students: [] });
    const [allStudents, setAllStudents] = useState([]);

    // Fetch team and all students data
    useEffect(() => {
        const fetchTeamAndStudents = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch team details
                const teamResponse = await axios.get(`http://localhost:5001/teams/${teamId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTeamData(teamResponse.data);

                // Fetch all registered students
                const studentsResponse = await axios.get(`http://localhost:5001/students`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllStudents(studentsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchTeamAndStudents();
    }, [teamId]);

    // Save updated team data
    const handleSave = async () => {
        if (window.confirm('Are you sure you want to save these changes?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.put(`http://localhost:5001/teams/${teamId}`, teamData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Team updated successfully');
                navigate('/Teacher_Dashboard');
            } catch (error) {
                console.error('Error updating team:', error);
                alert('Failed to update the team');
            }
        }
    };

    // Discard changes and return to dashboard
    const handleDiscard = () => {
        if (window.confirm('Are you sure you want to discard all changes?')) {
            navigate('/Teacher_Dashboard');
        }
    };

    // Handle adding a new student to the team
    const handleAddStudent = (studentId) => {
        if (!teamData.students.some((student) => student._id === studentId)) {
            const studentToAdd = allStudents.find((student) => student._id === studentId);
            setTeamData((prev) => ({
                ...prev,
                students: [...prev.students, studentToAdd],
            }));
        }
    };

    // Handle removing a student from the team
    const handleRemoveStudent = (studentId) => {
        setTeamData((prev) => ({
            ...prev,
            students: prev.students.filter((student) => student._id !== studentId),
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="max-w-2xl w-full bg-gray-800 text-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Team</h2>
                <form>
                    {/* Edit Team Name */}
                    <label className="block mb-4">
                        <span className="font-semibold text-gray-300">Edit Name:</span>
                        <input
                            type="text"
                            value={teamData.name}
                            onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                            className="mt-2 block w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    {/* Display Current Team Members */}
                    <div className="mb-4">
                        <span className="font-semibold text-gray-300">Current Team Members:</span>
                        <ul className="mt-2 list-disc list-inside">
                            {teamData.students.map((student) => (
                                <li key={student._id} className="flex justify-between items-center">
                                    <span>{`${student.firstName} ${student.lastName}`}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStudent(student._id)}
                                        className="text-white hover:underline text-sm"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Add New Students */}
                    <label className="block mb-4">
                        <span className="font-semibold text-gray-300">Add Students:</span>
                        <select
                            onChange={(e) => handleAddStudent(e.target.value)}
                            className="mt-2 block w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value=""
                        >
                            <option value="" disabled>
                                Select a student to add
                            </option>
                            {allStudents
                                .filter(
                                    (student) =>
                                        !teamData.students.some((member) => member._id === student._id)
                                )
                                .map((student) => (
                                    <option key={student._id} value={student._id}>
                                        {`${student.firstName} ${student.lastName}`}
                                    </option>
                                ))}
                        </select>
                    </label>

                    <div className="flex justify-between mt-6">
                        {/* Discard Changes Button */}
                        <button
                            type="button"
                            onClick={handleDiscard}
                            className="px-6 py-2 bg-black hover:border-white hover:border text-white rounded-lg shadow focus:outline-none"
                        >
                            Discard Changes
                        </button>
                        {/* Save Changes Button */}
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-6 py-2 bg-white hover:border-black hover:border text-black rounded-lg shadow focus:outline-none"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTeam;
