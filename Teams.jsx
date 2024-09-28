import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

// Dummy student data for dropdown
const students = [
  { id: 1, firstName: 'Alice', lastName: 'Smith' },
  { id: 2, firstName: 'Bob', lastName: 'Johnson' },
  { id: 3, firstName: 'Charlie', lastName: 'Williams' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Teacher_dashboard() {
  const [teamName, setTeamName] = useState(''); // State for team name
  const [selectedStudents, setSelectedStudents] = useState([]); // State for list of selected students

  const navigate = useNavigate();

  const handleAddStudent = (event) => {
    const selectedId = parseInt(event.target.value);
    const student = students.find((student) => student.id === selectedId);
    if (student && !selectedStudents.some((s) => s.id === student.id)) {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleSaveTeam = () => {
    // Check if all fields are empty or not
    if (!teamName.trim() || selectedStudents.length === 0) {
        alert('Please fill in all fields and select at least one student.');
        return;
      }
    // Perform save operation
    alert(`Team "${teamName}" with students: ${selectedStudents.map(s => s.firstName + ' ' + s.lastName).join(', ')} has been successfully created!`);
    navigate('/teacher-dashboard'); // This navigates back to the teacher's dashboard
  };

  const handleCancel = () => {
    navigate('/teacher-dashboard'); // This navigates back to the teacher's dashboard
  };

  const handleRemoveStudent = (id) => {
    setSelectedStudents(selectedStudents.filter((student) => student.id !== id));
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
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current 
                            ? 'bg-white text-black' 
                            : 'text-gray-300 hover:bg-blue-600 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
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

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
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
                {/* Mobile menu button */}
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
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current 
                      ? 'bg-white text-black' 
                      : 'text-gray-300 hover:bg-blue-600 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{user.name}</div>
                  <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create a New Team</h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Form to create a new team */}
            <div className="space-y-6">
              {/* Input for team name */}
              <div>
                <label htmlFor="team-name" className="block text-sm font-medium text-gray-700">
                  Team Name
                </label>
                <input
                  type="text"
                  id="team-name"
                  placeholder="Enter team name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>

              {/* Dropdown to select students */}
              <div>
                <label htmlFor="student-select" className="block text-sm font-medium text-gray-700">
                  Select Student
                </label>
                <select
                  id="student-select"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={handleAddStudent}
                >
                  <option value="">Select a student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display selected students */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Selected Students</label>
                <ul className="mt-1 list-disc list-inside">
                    {selectedStudents.map((student) => (
                    <li key={student.id} className="flex justify-between items-center">
                        <span>
                        {student.firstName} {student.lastName}
                        </span>
                        <button
                        type="button"
                        className="ml-2 text-blue-500 hover:text-blue-400" // Same color as nav bar
                        onClick={() => handleRemoveStudent(student.id)}
                        >
                        Remove
                        </button>
                    </li>
                    ))}
                </ul>
                </div>

              {/* Save Team and Cancel Changes Buttons */}
              <div className="flex space-x-4">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-b from-blue-500 to-blue-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleSaveTeam}
                >
                    Save Team
                </button>

                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
