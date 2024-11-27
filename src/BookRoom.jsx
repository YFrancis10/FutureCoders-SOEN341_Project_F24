import React, { useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [{ name: 'Dashboard', href: '/', current: true }];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const BookRoom = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve data from location state
    const teamMembers = location.state?.teamMembers || [];
    const teamName = location.state?.teamName || 'Unknown Team';
    const roomCapacity = location.state?.roomCapacity || 0;
    const roomName = location.state?.roomName || 'Unknown Room';

    const [meetingName, setMeetingName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [message, setMessage] = useState(null);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (selectedMembers.length > roomCapacity) {
            alert(
                `The selected number of attendees (${selectedMembers.length}) exceeds the room capacity (${roomCapacity}). Please select fewer attendees.`
            );
            return;
        }

        const bookingDate = new Date(`${date}T${startTime}`);
        const currentDate = new Date();
        const hoursDifference = (bookingDate - currentDate) / (1000 * 60 * 60);
        if (hoursDifference < 24) {
            alert('Bookings must be made at least 24 hours in advance.');
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
            alert('Rooms can only be booked between 8:00 AM and 11:00 PM.');
            return;
        }

        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);
        const durationMinutes = (end - start) / (1000 * 60);

        if (durationMinutes > 180) {
            alert('You cannot reserve a room for more than 3 hours.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5001/book-room',
                {
                    roomId,
                    date,
                    teamName,
                    startTime,
                    endTime,
                    meetingName,
                    attendees: selectedMembers,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setMessage('Room booked successfully!');
            }
        } catch (error) {
            setMessage(
                error.response?.data.message ||
                    'Error booking room. Please try again.'
            );
        }
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

    const goBackRoomList = () => {
        navigate('/RoomList', { state: { teamName, teamMembers } });
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">
                <div className=" mt-6 max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-100">
                        Book {roomName} for Team {teamName}
                    </h1>
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

                        <form onSubmit={handleBooking} className="space-y-4">
                            <div>
                                <label className="block text-md font-semibold mb-1">
                                    Meeting Name:
                                </label>
                                <input
                                    type="text"
                                    data-testid="meat"
                                    value={meetingName}
                                    onChange={(e) =>
                                        setMeetingName(e.target.value)
                                    }
                                    className="border p-2 rounded w-full text-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-md font-semibold mb-1">
                                    Select Attendees:
                                </label>
                                <div className="flex flex-col space-y-2">
                                    {teamMembers.map((member) => (
                                        <label
                                            key={member._id}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                data-testid="steven"
                                                value={member._id}
                                                checked={selectedMembers.includes(
                                                    member._id
                                                )}
                                                onChange={() =>
                                                    handleMemberSelect(
                                                        member._id
                                                    )
                                                }
                                                className="mr-2"
                                            />
                                            {member.firstName} {member.lastName}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-md font-semibold mb-1">
                                    Date:
                                </label>
                                <input
                                    data-testid="cal"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="border p-2 rounded w-full text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-md font-semibold mb-1">
                                    Start Time:
                                </label>
                                <input
                                    data-testid="debut"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) =>
                                        setStartTime(e.target.value)
                                    }
                                    className="border p-2 rounded w-full text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-md font-semibold mb-1">
                                    End Time:
                                </label>
                                <input
                                    data-testid="fin"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="border p-2 rounded w-full text-black"
                                    required
                                />
                            </div>

                            {message && (
                                <p className="mt-2 text-green-500">{message}</p>
                            )}

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
                                    onClick={goBackRoomList}
                                    className="px-4 py-2 bg-white text-black rounded-md border border-transparent hover:border-black transition duration-300"
                                >
                                    Go back to Room List Page
                                </button>
                                <button
                                    data-testid="cubnit"
                                    type="submit"
                                    className="px-4 py-2 bg-black text-white rounded-md border border-transparent hover:border-white transition duration-300"
                                >
                                    Book Room
                                </button>
                            </div>
                        </form>

                        <br />
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/Student_Dashboard')}
                                className="px-4 py-2 bg-white text-black rounded-md border border-transparent hover:border-black transition duration-300"
                            >
                                Go back to Student Dashboard page
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default BookRoom;
