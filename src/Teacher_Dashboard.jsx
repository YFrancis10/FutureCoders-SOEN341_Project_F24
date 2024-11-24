import React, { useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const TeacherDashboard = () => {
    const [teacher, setTeacher] = useState(null);
    const [teams, setTeams] = useState([]);
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
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeacherData();
    }, []);

    const handleCreateTeam = () => {
        navigate('/Teams'); // Navigate to the page for creating teams
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!teacher) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="min-h-full">
                <Disclosure
                    as="nav"
                    className="bg-gradient-to-b from-blue-500 to-blue-400"
                >
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                alt="Your Company"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                className="h-8 w-8"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {/* Dashboard Button */}
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            '/Teacher_Dashboard'
                                                        )
                                                    }
                                                    className="bg-white text-black rounded-md px-3 py-2 text-sm font-medium"
                                                >
                                                    Dashboard
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                            <Menu
                                                as="div"
                                                className="relative ml-3"
                                            >
                                                <div>
                                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt=""
                                                        />
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
                                                                    onClick={() =>
                                                                        navigate(
                                                                            '/your-profile'
                                                                        )
                                                                    }
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100'
                                                                            : '',
                                                                        'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                                    )}
                                                                >
                                                                    Your Profile
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={
                                                                        handleLogout
                                                                    }
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100'
                                                                            : '',
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
                            Teacher's Dashboard
                        </h1>
                    </div>
                </header>

                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold">
                            Welcome, {teacher.firstName} {teacher.lastName}
                        </h1>
                        <p>Email: {teacher.email}</p>
                        <p>Role: {teacher.role}</p>

                        <h2 className="text-xl font-semibold mt-4">
                            Your Teams:
                        </h2>
                        <ul className="mt-2 space-y-2">
                            {teams.length > 0 ? (
                                teams.map((team) => (
                                    <li
                                        key={team.id}
                                        className="border rounded-md p-4 shadow-md bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-lg">
                                                    {team.name}
                                                </h3>
                                                <p className="text-gray-600 mt-1">
                                                    Students:
                                                </p>
                                                {team.students.length > 0 ? (
                                                    <ul className="list-disc list-inside ml-4 mt-1">
                                                        {team.students.map(
                                                            (student) => (
                                                                <li
                                                                    key={
                                                                        student._id
                                                                    }
                                                                    className="text-gray-700"
                                                                >
                                                                    {
                                                                        student.firstName
                                                                    }{' '}
                                                                    {
                                                                        student.lastName
                                                                    }
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-500">
                                                        No students in this
                                                        team.
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2 flex flex-col items-center">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/summary/${team.id}`,
                                                            {
                                                                state: {
                                                                    teamName:
                                                                        team.name,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="rounded-md bg-blue-500 text-white px-4 py-2 text-sm font-medium"
                                                >
                                                    Display Team's Results
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteTeam(
                                                            team.id,
                                                            team.name
                                                        )
                                                    }
                                                    className="rounded-md bg-red-500 text-white px-4 py-2 text-sm font-medium"
                                                >
                                                    Delete Team
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500">
                                    No teams found.
                                </li>
                            )}
                        </ul>

                        <button
                            onClick={handleCreateTeam}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md text-lg hover:bg-green-600"
                        >
                            + Create a new team
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default TeacherDashboard;
