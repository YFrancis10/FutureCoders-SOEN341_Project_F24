import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [teams, setTeams] = useState([]); // State for teams
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.get('http://localhost:5001/teacher/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeacher(response.data);

        // Fetch teams data
        const teamsResponse = await axios.get('http://localhost:5001/teacher/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams(teamsResponse.data); // Set teams state
      } catch (error) {
        console.error('Error fetching teacher data', error);
      }
    };

    fetchTeacherData();
  }, []);

  if (!teacher) return <p>Loading...</p>;

  const handleCreateTeam = () => {
    navigate('/teams'); // Navigate to the 'Teams' page to create teams
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gradient-to-b from-blue-500 to-blue-400">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img alt="Your Company" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" className="h-8 w-8" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a href="#" className={classNames('text-gray-300 hover:bg-blue-600 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')}>
                      Dashboard
                    </a>
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
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-8 w-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a href={item.href} className="block px-4 py-2 text-sm text-gray-700">
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <DisclosureButton as="a" href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                Dashboard
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Teacher's Dashboard</h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold">Welcome, {teacher.firstName} {teacher.lastName}</h1>
            <p>Email: {teacher.email}</p>
            <p>Role: {teacher.role}</p>

            {/* Display list of teams */}
            <h2 className="text-xl font-semibold mt-4">Your Teams:</h2>
            <ul className="mt-2 space-y-2">
              {teams.length > 0 ? (
                teams.map((team) => (
                  <li key={team.id} className="border rounded-md p-3 shadow-md bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out">
                    <h3 className="font-bold">{team.name}</h3>
                    <p className="text-gray-600">Students:</p>
                    {team.students.length > 0 ? (
                      <ul className="list-disc list-inside ml-4">
                        {team.students.map(student => (
                          <li key={student._id}>
                            {student.firstName} {student.lastName}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No students in this team.</p>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No teams found.</li>
              )}
            </ul>

            {/* Create a new team button */}
            <button 
              onClick={handleCreateTeam} 
              className="flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-2 text-lg transform transition-transform duration-200 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-500 hover:scale-105 mt-4"
            >
              <span className="mr-2">+</span> Create a new team
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default TeacherDashboard;

