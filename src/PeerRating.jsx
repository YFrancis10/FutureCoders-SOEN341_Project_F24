// import React, { useState } from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };

// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
// ];

// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const PeerRating = () => {
//   const { teamId, studentId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { teammate, remainingTeammates = [], teamName } = location.state || {};

//   const [cooperation, setCooperation] = useState('');
//   const [conceptualContribution, setConceptualContribution] = useState('');
//   const [practicalContribution, setPracticalContribution] = useState('');
//   const [workEthic, setWorkEthic] = useState('');
//   const [comment, setComment] = useState('');
//   const [error, setError] = useState(null);

//   // Define rating options with descriptions
//   const ratingOptions = [
//     { value: 1, label: 'Poor' },
//     { value: 2, label: 'Fair' },
//     { value: 3, label: 'Good' },
//     { value: 4, label: 'Very Good' },
//     { value: 5, label: 'Excellent' },
//   ];

//   const submitRating = async () => {
//     if (!cooperation || !conceptualContribution || !practicalContribution || !workEthic) {
//       setError('Please select a valid rating for all dimensions (1-5).');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found');
//       }

//       await axios.post(
//         `http://localhost:5001/teams/${teamId}/ratings`,
//         {
//           rateeId: studentId,
//           cooperation,
//           conceptualContribution,
//           practicalContribution,
//           workEthic,
//           comment,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       navigate('/cooperation', {
//         state: {
//           updatedTeammates: remainingTeammates.filter((t) => t._id !== studentId),
//           teamId,
//           teamName,
//         },
//       });
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//       setError('Failed to submit rating. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-full">
//       <Disclosure as="nav" className="bg-gradient-to-b from-blue-500 to-blue-400">
//         {({ open }) => (
//           <>
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <div className="flex h-16 items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <img
//                       alt="Your Company"
//                       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                       className="h-8 w-8"
//                     />
//                   </div>
//                   <div className="hidden md:block">
//                     <div className="ml-10 flex items-baseline space-x-4">
//                       {navigation.map((item) => (
//                         <a
//                           key={item.name}
//                           href={item.href}
//                           className={classNames(
//                             item.current
//                               ? 'bg-white text-black'
//                               : 'text-gray-300 hover:bg-blue-600 hover:text-white',
//                             'rounded-md px-3 py-2 text-sm font-medium'
//                           )}
//                         >
//                           {item.name}
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="hidden md:block">
//                   <div className="ml-4 flex items-center md:ml-6">
//                     <button
//                       type="button"
//                       className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                     >
//                       <span className="sr-only">View notifications</span>
//                       <BellIcon className="h-6 w-6" aria-hidden="true" />
//                     </button>

//                     <Menu as="div" className="relative ml-3">
//                       <div>
//                         <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                           <span className="sr-only">Open user menu</span>
//                           <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
//                         </Menu.Button>
//                       </div>
//                       <Transition
//                         as={React.Fragment}
//                         enter="transition ease-out duration-100"
//                         enterFrom="transform opacity-0 scale-95"
//                         enterTo="transform opacity-100 scale-100"
//                         leave="transition ease-in duration-75"
//                         leaveFrom="transform opacity-100 scale-100"
//                         leaveTo="transform opacity-0 scale-95"
//                       >
//                         <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                           {userNavigation.map((item) => (
//                             <Menu.Item key={item.name}>
//                               {({ active }) => (
//                                 <a
//                                   href={item.href}
//                                   className={classNames(
//                                     active ? 'bg-gray-100' : '',
//                                     'block px-4 py-2 text-sm text-gray-700'
//                                   )}
//                                 >
//                                   {item.name}
//                                 </a>
//                               )}
//                             </Menu.Item>
//                           ))}
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 onClick={() => {
//                                   localStorage.removeItem('token');
//                                   navigate('/login');
//                                 }}
//                                 className={classNames(
//                                   active ? 'bg-gray-100' : '',
//                                   'block px-4 py-2 text-sm text-gray-700 w-full text-left'
//                                 )}
//                               >
//                                 Sign out
//                               </button>
//                             )}
//                           </Menu.Item>
//                         </Menu.Items>
//                       </Transition>
//                     </Menu>
//                   </div>
//                 </div>
//                 <div className="-mr-2 flex md:hidden">
//                   <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                     <span className="sr-only">Open main menu</span>
//                     {open ? (
//                       <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                     ) : (
//                       <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                     )}
//                   </Disclosure.Button>
//                 </div>
//               </div>
//             </div>

//             <Disclosure.Panel className="md:hidden">
//               <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
//                 {navigation.map((item) => (
//                   <Disclosure.Button
//                     key={item.name}
//                     as="a"
//                     href={item.href}
//                     className={classNames(
//                       item.current
//                         ? 'bg-white text-black'
//                         : 'text-gray-300 hover:bg-blue-600 hover:text-white',
//                       'block rounded-md px-3 py-2 text-base font-medium'
//                     )}
//                   >
//                     {item.name}
//                   </Disclosure.Button>
//                 ))}
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>

//       <header className="bg-white shadow">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//             Team Evaluation: {teamName}
//           </h1>
//         </div>
//       </header>

//       <main className="ml-0">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <div className="w-full flex flex-col">
//             <div className="mt-6 w-1/2">
//               <h2 className="text-3xl font-bold mb-4">
//                 Rate {teammate ? `${teammate.firstName} ${teammate.lastName}` : 'Teammate'}
//               </h2>

//               {/* Cooperation Rating */}
//               <label className="block text-lg font-medium text-gray-900">Cooperation (1-5):</label>
//               <select value={cooperation} onChange={(e) => setCooperation(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md">
//                 <option value="">--Select--</option>
//                 {ratingOptions.map(option => (
//                   <option key={option.value} value={option.value}>{option.value} - {option.label}</option>
//                 ))}
//               </select>

//               {/* Conceptual Contribution Rating */}
//               <label className="block text-lg font-medium text-gray-900 mt-4">Conceptual Contribution (1-5):</label>
//               <select value={conceptualContribution} onChange={(e) => setConceptualContribution(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md">
//                 <option value="">--Select--</option>
//                 {ratingOptions.map(option => (
//                   <option key={option.value} value={option.value}>{option.value} - {option.label}</option>
//                 ))}
//               </select>

//               {/* Practical Contribution Rating */}
//               <label className="block text-lg font-medium text-gray-900 mt-4">Practical Contribution (1-5):</label>
//               <select value={practicalContribution} onChange={(e) => setPracticalContribution(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md">
//                 <option value="">--Select--</option>
//                 {ratingOptions.map(option => (
//                   <option key={option.value} value={option.value}>{option.value} - {option.label}</option>
//                 ))}
//               </select>

//               {/* Work Ethic Rating */}
//               <label className="block text-lg font-medium text-gray-900 mt-4">Work Ethic (1-5):</label>
//               <select value={workEthic} onChange={(e) => setWorkEthic(e.target.value)} className="mt-1 w-full border-gray-300 rounded-md">
//                 <option value="">--Select--</option>
//                 {ratingOptions.map(option => (
//                   <option key={option.value} value={option.value}>{option.value} - {option.label}</option>
//                 ))}
//               </select>

//               {/* Comment field */}
//               <label className="block text-lg font-medium text-gray-900 mt-4">Comments:</label>
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="mt-1 w-full border-gray-300 rounded-md"
//                 rows="4"
//                 placeholder={`Write a comment for ${teammate?.firstName || 'your teammate'}`} // Placeholder with teammate's name
//               />
//               {error && <p className="text-red-500 mt-4">{error}</p>}

//               <button
//                 onClick={submitRating}
//                 className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//               >
//                 Submit Rating
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PeerRating;

import React, { useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [{ name: 'Dashboard', href: '#', current: true }];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const PeerRating = () => {
    const { teamId, studentId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {
        teammate,
        remainingTeammates = [],
        teamName,
    } = location.state || {};

    const [cooperation, setCooperation] = useState('');
    const [conceptualContribution, setConceptualContribution] = useState('');
    const [practicalContribution, setPracticalContribution] = useState('');
    const [workEthic, setWorkEthic] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const ratingOptions = [
        { value: 1, label: '1 - Poor' },
        { value: 2, label: '2 - Fair' },
        { value: 3, label: '3 - Good' },
        { value: 4, label: '4 - Very Good' },
        { value: 5, label: '5 - Excellent' },
    ];

    const submitRating = async () => {
        if (
            !cooperation ||
            !conceptualContribution ||
            !practicalContribution ||
            !workEthic
        ) {
            setError('Please select a valid rating for all dimensions (1-5).');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            await axios.post(
                `http://localhost:5001/teams/${teamId}/ratings`,
                {
                    rateeId: studentId,
                    cooperation,
                    conceptualContribution,
                    practicalContribution,
                    workEthic,
                    comment,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            navigate('/cooperation', {
                state: {
                    updatedTeammates: remainingTeammates.filter(
                        (t) => t._id !== studentId
                    ),
                    teamId,
                    teamName,
                },
            });
        } catch (error) {
            console.error('Error submitting rating:', error);
            setError('Failed to submit rating. Please try again.');
        }
    };

    return (
        <div className="">
            <main className="ml-0">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="w-full flex flex-col">
                        <div className="mt-6 w-1/2">
                            <h2 className="text-3xl font-bold mb-4 text-gray-100">
                                Rate{' '}
                                {teammate
                                    ? `${teammate.firstName} ${teammate.lastName}`
                                    : 'Teammate'}
                            </h2>

                            {/* Cooperation Rating */}
                            <label className="text-lg font-semibold text-gray-300">
                                Cooperation
                            </label>
                            <select
                             data-testid="cop"
                                value={cooperation}
                                onChange={(e) => setCooperation(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Rating</option>
                                {ratingOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <br />

                            {/* Conceptual Contribution Rating */}
                            <label className="text-lg font-semibold text-gray-300 mt-4">
                                Conceptual Contribution
                            </label>
                            <select
                                 data-testid="con"
                                value={conceptualContribution}
                                onChange={(e) =>
                                    setConceptualContribution(e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Rating</option>
                                {ratingOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <br />

                            {/* Practical Contribution Rating */}
                            <label className="text-lg font-semibold text-gray-300 mt-4">
                                Practical Contribution
                            </label>
                            <select
                                 data-testid="prac"
                                value={practicalContribution}
                                onChange={(e) =>
                                    setPracticalContribution(e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Rating</option>
                                {ratingOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <br />

                            {/* Work Ethic Rating */}
                            <label className="text-lg font-semibold text-gray-300 mt-4">
                                Work Ethic
                            </label>
                            <select
                              data-testid="weth"
                                value={workEthic}
                                onChange={(e) => setWorkEthic(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Rating</option>
                                {ratingOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <br />

                            {/* Comment */}
                            <label className="text-lg font-semibold text-gray-300 mt-4">
                                Comments
                            </label>
                            <textarea
                                 data-testid="comm"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-800 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows={4}
                            />

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={submitRating}
                                className="mt-6 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-lg font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PeerRating;
