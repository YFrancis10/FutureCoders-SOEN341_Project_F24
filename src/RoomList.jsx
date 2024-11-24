import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    // Extract teamName and teamMembers from location.state
    const teamName = location.state?.teamName || 'Unknown Team';
    const teamMembers = location.state?.teamMembers || [];

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:5001/study-rooms',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const goBackHome = () => {
        navigate('/Student_Dashboard');
    };

    if (loading) {
        return <p>Loading rooms...</p>;
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">
                <div className=" mt-6 max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-100">
                        Available Study Rooms for Team {teamName}
                    </h1>
                </div>

                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h2 className="text-2xl mb-4">Select a room:</h2>
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <div
                                    key={room._id}
                                    className="p-4 rounded-lg shadow-md border border-gray-200 mb-4 flex justify-between items-center hover:bg-black transition duration-150 ease-in-out glass"
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            {room.roomName}
                                        </h2>
                                        <p className="text-black">
                                            Capacity: {room.capacity}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/BookRoom/${room._id}`}
                                        state={{
                                            teamMembers,
                                            teamName,
                                            roomCapacity: room.capacity,
                                            roomName: room.roomName,
                                        }}
                                        className="px-4 py-2 bg-black text-white rounded-md border border-transparent hover:border-white hover:bg-white hover:text-black transition duration-300"
                                    >
                                        Select Room
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No rooms available</p>
                        )}

                        <button
                            type="button"
                            onClick={goBackHome}
                            className="px-4 py-2 bg-white text-black rounded-md border border-transparent hover:border-black transition duration-300"
                        >
                            Go back to Student Dashboard page
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default RoomList;
