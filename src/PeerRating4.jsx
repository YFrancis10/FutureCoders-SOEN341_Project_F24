import React, { useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PeerRating4 = () => {
  const { teamId, studentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { teammate, remainingTeammates = [], teamName } = location.state || {};

  const [workEthic, setWorkEthic] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("teamId:", teamId);
    console.log("studentId:", studentId);
    console.log("remainingTeammates:", remainingTeammates);
    console.log("teamName:", teamName);
  }, [teamId, studentId, remainingTeammates, teamName]);

  const submitRating = async () => {
    if (!workEthic || workEthic < 1 || workEthic > 5) {
      setError('Please select a valid work ethic rating (1-5).');
      return;
    }

    if (!comment) {
      setError('Please enter a comment.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(
        `http://localhost:5001/teams/${teamId}/ratings`,
        { rateeId: studentId, workEthic, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Response:', response);

      navigate('/work_ethic', {
        state: {
          updatedTeammates: remainingTeammates.filter((t) => t._id !== studentId),
          teamId,
          teamName,
        },
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        setError(error.response.data.message || 'Failed to submit rating. Please try again.');
      } else {
        setError(error.message || 'Failed to submit rating. Please try again.');
      }
    }
  };

  if (error) return <p>{error}</p>;

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
                      <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        className="h-8 w-8"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-white text-black'
                                : 'text-gray-300 hover:bg-blue-600 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
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
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
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
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    localStorage.removeItem('token');
                                    navigate('/login');
                                  }}
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
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-white text-black'
                          : 'text-gray-300 hover:bg-blue-600 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Team Work Ethic Evaluation
            </h1>
          </div>
        </header>

        <main className="ml-0">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full flex flex-col">
              <div className="mt-6 w-1/2">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold mb-4">
                    Rate {teammate ? `${teammate.firstName} ${teammate.lastName}` : 'Teammate'}:
                  </h2>
                  <br />
                  <label htmlFor="workEthic" className="block text-lg font-medium text-gray-900">
                    Work Ethic Rating (1-5):
                  </label>
                  <select
                    id="workEthic"
                    value={workEthic}
                    onChange={(e) => setWorkEthic(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="" disabled>--Select a rating--</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <br />
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-lg font-medium text-gray-900">
                    Comments:
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder={`Write your feedback for ${teammate.firstName}`}
                  />
                </div>

                <button
                  onClick={submitRating}
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-2 text-lg transform transition-transform duration-200 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-500 hover:scale-105">
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PeerRating4;
