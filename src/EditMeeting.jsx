import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditMeeting = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve data from location state
    const meetingDetails = location.state?.meetingDetails || {};
    const teamName = location.state?.teamName || 'Unknown Team'; // Fallback to 'Unknown Team' if undefined

    const [meetingName, setMeetingName] = useState(meetingDetails.meetingName || '');
    const [rooms, setRooms] = useState([]); // To store the list of rooms
    const [selectedRoom, setSelectedRoom] = useState('-- select room --'); // For the dropdown selection
    const [teamMembers, setTeamMembers] = useState([]); // Initialize team members state
    const [date, setDate] = useState(meetingDetails.date || '');
    const [startTime, setStartTime] = useState(meetingDetails.startTime || '');
    const [endTime, setEndTime] = useState(meetingDetails.endTime || '');
    const [selectedMembers, setSelectedMembers] = useState(meetingDetails.attendees || []);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!meetingDetails) {
            navigate('/Student_Dashboard');
        }
    }, [meetingDetails, navigate]);

        // Fetch available study rooms
        useEffect(() => {
            const fetchRooms = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get('http://localhost:5001/study-rooms', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setRooms(response.data); // Set fetched rooms to state
                } catch (error) {
                    console.error('Error fetching rooms:', error);
                }
            };
            fetchRooms();
        }, []);
        

        useEffect(() => {
            const fetchTeamMembers = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error('No authentication token found.');
                        return;
                    }
        
                    const response = await axios.get(
                        `http://localhost:5001/teams/${meetingDetails.teamId}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
        
                    if (response.data && response.data.students) {
                        setTeamMembers(response.data.students); // Save the fetched team members to state
                    } else {
                        console.error('No team members found in response.');
                        setTeamMembers([]); // Ensure it's an empty array if no members are found
                    }
                } catch (error) {
                    console.error('Error fetching team members:', error);
                    setTeamMembers([]); // Handle error state
                }
            };
        
            if (meetingDetails.teamId) {
                fetchTeamMembers();
            }
        }, [meetingDetails.teamId]);
        
        
        const handleEditMeeting = async (e) => {
            e.preventDefault();
        
            if (!meetingName.trim()) {
                alert('Meeting name cannot be empty.');
                return;
            }
        
            if (selectedRoom === '-- select room --') {
                alert('Please select a room.');
                return;
            }

        if (selectedMembers.length === 0) {
            alert('At least one teammate must be selected.');
            return;
        }

        const bookingDate = new Date(`${date}T${startTime}`);
        const currentDate = new Date();
        const hoursDifference = (bookingDate - currentDate) / (1000 * 60 * 60);
        if (hoursDifference < 24) {
            alert('Meetings must be scheduled at least 24 hours in advance.');
            return;
        }

        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        if (
            startHour < 8 ||
            (startHour === 8 && startMinute < 0) ||
            endHour > 23 ||
            (endHour === 23 && endMinute > 0)
        ) {
            alert('Meetings can only be scheduled between 8:00 AM and 11:00 PM.');
            return;
        }

        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);
        const durationMinutes = (end - start) / (1000 * 60);

        if (durationMinutes > 180) {
            alert('Meeting duration cannot exceed 3 hours.');
            return;
        }

        alert("All verifications passed!");

        /* try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5001/meetings/${meetingDetails._id}`,
                {
                    meetingName,
                    roomId: room,
                    date,
                    startTime,
                    endTime,
                    attendees: selectedMembers,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setMessage('Meeting updated successfully!');
                navigate('/Student_Dashboard');
            }
        } catch (error) {
            setMessage(
                error.response?.data.message || 'Error updating meeting. Please try again.'
            );
        } */
    };

    const handleMemberSelect = (memberId) => {
        setSelectedMembers((prevSelected) =>
            prevSelected.includes(memberId)
                ? prevSelected.filter((id) => id !== memberId)
                : [...prevSelected, memberId]
        );
    };

    const clearForm = () => {
        setMeetingName('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setSelectedMembers([]);
        setMessage(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">
            <div className="mt-6 max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-100">Edit {meetingName} for {teamName} team</h1>
            </div>

            <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">
                                Please Note:
                            </h2>
                            <ul className="list-disc pl-5 text-white space-y-1">
                                <li>
                                    All bookings must be made at least 24 hours
                                    in advance.
                                </li>
                                <li>
                                    Study rooms are available from 8:00 AM to
                                    11:00 PM every day.
                                </li>
                                <li>
                                    Each room booking has a maximum duration of
                                    3 hours.
                                </li>
                                <li>
                                    Please ensure all attendees are aware of the
                                    room location and timing.
                                </li>
                                <li>
                                    Please ensure that the selected number of
                                    attendees for the {teamName} team fits the
                                    capacity of the room.
                                </li>
                            </ul>
                        </div>
                    </div>

                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                    <form onSubmit={handleEditMeeting} className="space-y-4">
                        <div>
                            <label className="block text-md font-semibold mb-1">Meeting Name:</label>
                            <input
                                type="text"
                                value={meetingName}
                                onChange={(e) => setMeetingName(e.target.value)}
                                className="border p-2 rounded w-full text-black"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-md font-semibold mb-1">Select Room:</label>
                            <select
                                value={selectedRoom}
                                onChange={(e) => setSelectedRoom(e.target.value)} // Update correct state
                                className="border p-2 rounded w-full text-black"
                                required
                            >
                                <option value="-- select room --" disabled>
                                    -- Select a room --
                                </option>
                                {rooms.map((room) => (
                                    <option key={room._id} value={room._id}>
                                        {room.roomName} - Capacity: {room.capacity}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                        <label className="block text-md font-semibold mb-1">Select Attendees:</label>
                        <div className="flex flex-col space-y-2">
                            {teamMembers.length > 0 ? (
                                teamMembers.map((member) => (
                                    <label key={member._id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={member._id}
                                            onChange={() => handleMemberSelect(member._id)}
                                            className="mr-2"
                                        />
                                        {member.firstName} {member.lastName}
                                    </label>
                                ))
                            ) : (
                                <p>No team members found.</p>
                            )}
                        </div>
                    </div>


                        <div>
                            <label className="block text-md font-semibold mb-1">Date:</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="border p-2 rounded w-full text-black"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-md font-semibold mb-1">Start Time:</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="border p-2 rounded w-full text-black"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-md font-semibold mb-1">End Time:</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="border p-2 rounded w-full text-black"
                                required
                            />
                        </div>

                        {message && <p className="mt-2 text-green-500">{message}</p>}

                        <button
                            type="button"
                            onClick={clearForm}
                            className="px-4 py-2 bg-white text-black rounded-md border border-transparent hover:border-black transition duration-300"
                            >
                            Clear Data
                        </button>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/Student_Dashboard')}
                                className="px-4 py-2 bg-white text-black rounded-md border border-transparent hover:border-black transition duration-300"
                            >
                                Go back to Student Dashboard page
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-black text-white rounded-md border border-transparent hover:border-white transition duration-300"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditMeeting;
