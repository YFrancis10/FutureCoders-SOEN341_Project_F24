import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Summary() {
  const { teamId } = useParams();
  const location = useLocation();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve the team name from the location state
  const teamName = location.state?.teamName || 'Loading...';

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5001/teams/${teamId}/ratings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeamData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team data');
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
                    <a href="#" className="bg-white text-black rounded-md px-3 py-2 text-sm font-medium">Dashboard</a>
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
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Team Assessment Summary</h1>
          </div>
        </header>

        <main>
          <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Team: {teamName}</h1>
            
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border text-center">Student ID</th>
                  <th className="py-2 px-4 border text-center">Last Name</th>
                  <th className="py-2 px-4 border text-center">First Name</th>
                  <th className="py-2 px-4 border text-center">Cooperation</th>
                  <th className="py-2 px-4 border text-center">Conceptual Contribution</th>
                  <th className="py-2 px-4 border text-center">Practical Contribution</th>
                  <th className="py-2 px-4 border text-center">Work Ethic</th>
                  <th className="py-2 px-4 border text-center">Average</th>
                  <th className="py-2 px-4 border text-center">Peers Who Responded</th>
                </tr>
              </thead>
              <tbody>
                {teamData.map((student, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border text-center">{student.studentID}</td>
                    <td className="py-2 px-4 border text-center">{student.lastName}</td>
                    <td className="py-2 px-4 border text-center">{student.firstName}</td>
                    <td className="py-2 px-4 border text-center">{(student.cooperation || 0).toFixed(1)}</td>
                    <td className="py-2 px-4 border text-center">{(student.conceptualContribution || 0).toFixed(1)}</td>
                    <td className="py-2 px-4 border text-center">{(student.practicalContribution || 0).toFixed(1)}</td>
                    <td className="py-2 px-4 border text-center">{(student.workEthic || 0).toFixed(1)}</td>
                    <td className="py-2 px-4 border text-center">{(student.average || 0).toFixed(1)}</td>
                    <td className="py-2 px-4 border text-center">{student.peersWhoResponded || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-start gap-x-4">
                <button
                    onClick={() => navigate('/Teacher_Dashboard')}
                    className="inline-flex items-center justify-center rounded-md bg-gray-200 text-black px-4 py-3 text-base hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
                >
                    Go Back to Teacher Dashboard
                </button>
                <button
                    onClick={() => navigate(`/teams/${teamId}/detailed-results`)}
                    className="inline-flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-3 text-base transform transition-transform duration-200 hover:from-blue-600 hover:to-blue-500 hover:scale-105"
                >
                    Display Detailed Results
                </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Summary;
