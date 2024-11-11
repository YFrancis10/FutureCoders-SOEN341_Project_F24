import React, { useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DetailedResults = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5001/teams/${teamId}/detailed-results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { teamName, students } = response.data;
        setTeamName(teamName);
        setStudents(students);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching detailed view data:', error);
        setError("Failed to load team details.");
        setLoading(false);
      }
    };
    fetchData();
  }, [teamId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gradient-to-b from-blue-500 to-blue-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="bg-white text-black rounded-md px-3 py-2 text-sm font-medium">
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
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              </Disclosure.Button>
            </div>
          </div>
        </div>
      </Disclosure>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Detailed Team Assessment</h1>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Team: {teamName}</h2>

        {students.map((student, index) => (
          <div key={index} className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{student.name}</h3>

            <table className="min-w-full bg-white border border-gray-300 mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border text-center">Rater ID</th>
                  <th className="py-2 px-4 border text-center">Rater Name</th>
                  <th className="py-2 px-4 border text-center">Cooperation</th>
                  <th className="py-2 px-4 border text-center">Conceptual</th>
                  <th className="py-2 px-4 border text-center">Practical</th>
                  <th className="py-2 px-4 border text-center">Work Ethic</th>
                  <th className="py-2 px-4 border text-center">Average</th>
                </tr>
              </thead>
              <tbody>
                {student.ratings.map((rating, rIndex) => (
                  <tr key={rIndex} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{rating.raterID || 'N/A'}</td>
                    <td className="px-4 py-2 border text-center">{rating.raterName}</td>
                    <td className="px-4 py-2 border text-center">{rating.score.cooperation || 'No rating'}</td>
                    <td className="px-4 py-2 border text-center">{rating.score.conceptualContribution || 'No rating'}</td>
                    <td className="px-4 py-2 border text-center">{rating.score.practicalContribution || 'No rating'}</td>
                    <td className="px-4 py-2 border text-center">{rating.score.workEthic || 'No rating'}</td>
                    <td className="px-4 py-2 border text-center">
                      {(
                        (rating.score.cooperation +
                          rating.score.conceptualContribution +
                          rating.score.practicalContribution +
                          rating.score.workEthic) /
                        4
                      ).toFixed(2) || 'No rating'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <h4 className="text-lg font-semibold text-gray-800">Comments:</h4>
              {student.ratings.map((rating, rIndex) => (
                <p key={rIndex} className="text-gray-700">
                  {rating.raterName} (ID: {rating.raterID}): {rating.comment || '(No comment)'}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6 flex gap-x-4">
          <Link
            to="/Teacher_Dashboard"
            className="inline-flex items-center justify-center rounded-md bg-gray-200 text-black px-4 py-3 text-base hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
          >
            Go Back to Teacher Dashboard
          </Link>
          <button
            onClick={() => navigate(`/summary/${teamId}`, { state: { teamName } })}
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-3 text-base transform transition-transform duration-200 hover:from-blue-600 hover:to-blue-500 hover:scale-105"
          >
            Display Summarized Results 
          </button>
        </div>
      </main>
    </div>
  );
};

export default DetailedResults;
