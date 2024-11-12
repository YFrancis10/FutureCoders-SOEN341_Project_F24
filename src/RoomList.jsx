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
  const teamName = location.state?.teamName || "Unknown Team";
  const teamMembers = location.state?.teamMembers || [];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/study-rooms', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
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

  if (loading) return <p>Loading rooms...</p>;

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gradient-to-b from-blue-500 to-blue-400">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img alt="Your Company" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" className="h-8 w-8" />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <Link to="/" className="bg-white text-black rounded-md px-3 py-2 text-sm font-medium">Dashboard</Link>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={handleLogout}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Available Study Rooms for Team {teamName}
            </h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-2xl mb-4">Select a room:</h2>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div key={room._id} className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200 mb-4 flex justify-between items-center hover:bg-gray-200 transition duration-150 ease-in-out">
                  <div>
                    <h2 className="text-xl font-semibold">{room.roomName}</h2>
                    <p className="text-gray-700">Capacity: {room.capacity}</p>
                  </div>
                  <Link
                    to={`/BookRoom/${room._id}`}
                    state={{ teamMembers, teamName, roomCapacity: room.capacity, roomName: room.roomName }}
                    className="rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-2 text-sm font-medium transition-transform duration-200 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-500 hover:scale-105"
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
              className="mt-4 inline-flex items-center justify-center rounded-md bg-gray-200 text-black px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-transform transform hover:scale-105">
              Go back to Student Dashboard page
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default RoomList;
