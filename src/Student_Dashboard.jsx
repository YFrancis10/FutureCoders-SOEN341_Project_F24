import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentDashboard() {
    const [student, setStudent] = useState(null);
    const [teams, setTeams] = useState([]);
    const [meetings, setMeetings] = useState([]);
    // const [commentsVisible, setCommentsVisible] = useState(false); // New state for comments visibility
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch student data
    const fetchStudentData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication failed. Please log in again.');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5001/student/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStudent(response.data);
        } catch (error) {
            console.error('Error fetching student data:', error);
            setError('Failed to load student data. Please try again later.');
        }
    };

    // Fetch teams
    const fetchTeams = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication failed. Please log in again.');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5001/student/teams', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTeams(response.data);
        } catch (error) {
            console.error('Error fetching teams:', error);
            setError('Failed to load teams. Please try again later.');
        }
    };

    // Fetch meetings
    const fetchMeetings = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5001/student/meetings', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMeetings(response.data);
        } catch (error) {
            console.error('Error fetching meetings:', error);
            if (error.response?.status === 404) {
                setMeetings([]); // Handle no meetings found without disrupting the UI
            } else {
                setError('Failed to load meetings.');
            }
        }
    };

/*     // Fetch comments visibility
    const fetchCommentsVisibility = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5001/comments-visibility', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCommentsVisible(response.data.visible);
        } catch (error) {
            console.error('Error fetching comments visibility:', error);
        }
    };

    // Handle "See Your Comments" button
    const handleSeeComments = () => {
        if (!commentsVisible) {
            alert(
                `You cannot see your comments evaluation. Please wait for your professor to activate the comments.`
            );
        } else {
            navigate('/your-comments'); // Redirect to YourComments.jsx page
        }
    }; */

    // Delete meeting
    const handleDeleteMeeting = async (meetingId, meetingName) => {
        const userConfirmed = window.confirm(
            `Are you sure you want to delete meeting "${meetingName}"?`
        );

        if (!userConfirmed) return;

        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(
                `http://localhost:5001/meetings/${meetingId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                setMeetings((prevMeetings) =>
                    prevMeetings.filter((meeting) => meeting._id !== meetingId)
                );
            }
        } catch (error) {
            console.error('Error deleting meeting:', error);
            alert('Failed to delete meeting. Please try again.');
        }
    };

    const handleEditMeeting = (meeting) => {
        // Find the team by matching the teamName from meetings with the teams list
        const selectedTeam = teams.find((team) => team.name === meeting.teamName);
    
        // Map attendees with their details (if provided)
        const mappedAttendees = meeting.attendees.map((attendee) => ({
            _id: attendee._id,
            firstName: attendee.firstName,
            lastName: attendee.lastName,
        }));
    
        navigate(`/EditMeeting`, {
            state: {
                meetingDetails: {
                    meetingName: meeting.meetingName || '',
                    roomName: meeting.roomName || '', // Pass roomName
                    date: meeting.date || '',
                    startTime: meeting.startTime || '',
                    endTime: meeting.endTime || '',
                    attendees: mappedAttendees || [], // Pass attendees
                    meetingId: meeting._id, // Meeting ID for updates
                },
                teamName: meeting.teamName || 'Unknown Team', // Pass team name
                teamMembers: selectedTeam ? selectedTeam.students : [], // Pass teammates if found
            },
        });
    };
    

    useEffect(() => {
        fetchStudentData();
        // fetchCommentsVisibility(); // Fetch comments visibility state
    }, []);

    useEffect(() => {
        if (student) {
            fetchTeams();
            fetchMeetings();
        }
    }, [student]);

    return (
        <div className="">
            <main className="max-w-7xl mx-auto px-4 py-6">
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Student Info Section */}
                <section className="p-6 rounded-lg shadow-md mb-6 glass">
                    <h2 className="text-lg font-semibold text-gray-100">
                        Welcome, {student?.firstName} {student?.lastName}
                    </h2>
                    <p className="text-gray-300">Email: {student?.email}</p>
                    <p className="text-gray-300">Role: {student?.role}</p>
                    <p className="text-gray-300">Student ID: {student?.studentID}</p>
                </section>

                {/* Teams Section */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">Your Teams</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <div
                                    key={team._id}
                                    className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 glass flex flex-col justify-between"
                                    style={{ minHeight: '200px' }}
                                >
                                    <div>
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
                                    </div>
                                    <div className="mt-auto flex flex-col gap-2">
                                        <button
                                            onClick={() =>
                                                navigate(`/Team_Evaluation/${team._id}`, {
                                                    state: { team, student },
                                                })
                                            }
                                            className="bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                                        >
                                            Evaluate Team
                                        </button>
 {/*                                        <button
                                            onClick={handleSeeComments} // "See Your Comments" button
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                                        >
                                            See Your Comments
                                        </button> */}
                                        <button
                                            onClick={() =>
                                                navigate('/RoomList', {
                                                    state: { teamName: team.name, teamMembers: team.students },
                                                })
                                            }
                                            className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-200 transition duration-300"
                                        >
                                            Book a Study Room
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300">No teams found.</p>
                        )}
                    </div>
                </section>

                <br />

                {/* Meetings Section */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">Your Meetings</h2>
                    {meetings.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {meetings.map((meeting) => {
                                const formatTime = (time) => {
                                    const [hour, minute] = time.split(':').map(Number);
                                    const ampm = hour >= 12 ? 'PM' : 'AM';
                                    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for AM/PM
                                    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
                                };

                                return (
                                    <div
                                        key={meeting._id}
                                        className="flex flex-col justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 glass"
                                        style={{ minHeight: '300px' }}
                                    >
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-100 mb-2">
                                                {meeting.meetingName || 'No Meeting Name'}
                                            </h3>
                                            <p className="text-gray-300 mb-2">
                                                Team: {meeting.teamName || 'No Team Name'}
                                            </p>
                                            <p className="text-gray-300 mb-2">
                                                Admin: {meeting.admin || 'Unknown Admin'}
                                            </p>
                                            <p className="text-gray-300 mb-2">
                                                Room: {meeting.roomName || 'No Room Name'}
                                            </p>
                                            <p className="text-gray-300 mb-2">
                                                Date: {meeting.date || 'No Date'}
                                            </p>
                                            <p className="text-gray-300 mb-2">
                                                Time: {formatTime(meeting.startTime || 'N/A')} -{' '}
                                                {formatTime(meeting.endTime || 'N/A')}
                                            </p>
                                            <p className="text-gray-300 mb-2">Attendees: </p>
                                            {Array.isArray(meeting.attendees) && meeting.attendees.length > 0 ? (
                                                <ul className="list-disc list-inside ml-4 text-gray-200">
                                                    {meeting.attendees.map((attendee, index) => (
                                                        <li key={index}>
                                                            {attendee.firstName || 'N/A'}{' '}
                                                            {attendee.lastName || 'N/A'}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500">No attendees.</p>
                                            )}
                                        </div>

                                        <br />

                                        {meeting.admin === `${student?.firstName} ${student?.lastName}` && (
                                            <div className="mt-auto flex flex-col space-y-4">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteMeeting(
                                                            meeting._id,
                                                            meeting.meetingName
                                                        )
                                                    }
                                                    className="w-full bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                                                >
                                                    Delete Meeting
                                                </button>
                                                <button
                                                    onClick={() => handleEditMeeting(meeting)}
                                                    className="w-full bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-200 transition duration-300"
                                                >
                                                    Edit Meeting
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-300">No meetings scheduled yet.</p>
                    )}
                </section>
            </main>
        </div>
    );
}

export default StudentDashboard;
