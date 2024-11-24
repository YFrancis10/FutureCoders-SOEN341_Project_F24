// import React, { useState } from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { useNavigate, useLocation } from 'react-router-dom';

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };

// const navigation = [{ name: 'Dashboard', href: '#', current: true }];
// const userNavigation = [{ name: 'Your Profile', href: '#' }, { name: 'Settings', href: '#' }];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Cooperation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { selectedTeammates = [], teamName = '', teamId, updatedTeammates } = location.state || {};

//   const [remainingTeammates, setRemainingTeammates] = useState(updatedTeammates || selectedTeammates);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const handleGoBack = () => {
//     navigate(`/Student_Dashboard`);
//   };

//   const handleRateTeammate = (teammate) => {
//     navigate(`/PeerRating/${teamId}/${teammate._id}`, {
//       state: {
//         teammate,
//         remainingTeammates: remainingTeammates.filter((t) => t._id !== teammate._id),
//         teamId,
//         teamName,
//       },
//     });
//   };

//   return (
//     <div className="min-h-full">
//       {/* Navigation Bar */}
//       <Disclosure as="nav" className="bg-gradient-to-b from-blue-500 to-blue-400">
//         {({ open }) => (
//           <>
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <div className="flex h-16 items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <img alt="Your Company" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" className="h-8 w-8" />
//                   </div>
//                   <div className="hidden md:block">
//                     <div className="ml-10 flex items-baseline space-x-4">
//                       {navigation.map((item) => (
//                         <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-white text-black' : 'text-gray-300 hover:bg-blue-600 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')}>
//                           {item.name}
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="hidden md:block">
//                   <div className="ml-4 flex items-center md:ml-6">
//                     <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
//                       <Transition as={React.Fragment}>
//                         <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                           {userNavigation.map((item) => (
//                             <Menu.Item key={item.name}>
//                               {({ active }) => (
//                                 <a href={item.href} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
//                                   {item.name}
//                                 </a>
//                               )}
//                             </Menu.Item>
//                           ))}
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button onClick={handleLogout} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}>
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
//                     {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
//                   </Disclosure.Button>
//                 </div>
//               </div>
//             </div>

//             <Disclosure.Panel className="md:hidden">
//               <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
//                 {navigation.map((item) => (
//                   <Disclosure.Button key={item.name} as="a" href={item.href} className={classNames(item.current ? 'bg-white text-black' : 'text-gray-300 hover:bg-blue-600 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}>
//                     {item.name}
//                   </Disclosure.Button>
//                 ))}
//               </div>
//               <div className="border-t border-gray-700 pb-3 pt-4">
//                 <div className="flex items-center px-5">
//                   <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
//                   <div className="ml-3">
//                     <div className="text-base font-medium leading-none text-white">{user.name}</div>
//                     <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
//                   </div>
//                   <button type="button" className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                     <span className="sr-only">View notifications</span>
//                     <BellIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>
//                 <div className="mt-3 space-y-1 px-2">
//                   {userNavigation.map((item) => (
//                     <Disclosure.Button key={item.name} as="a" href={item.href} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-blue-600 hover:text-white">
//                       {item.name}
//                     </Disclosure.Button>
//                   ))}
//                   <Disclosure.Button as="button" onClick={handleLogout} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-blue-600 hover:text-white w-full text-left">
//                     Sign out
//                   </Disclosure.Button>
//                 </div>
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>

//       {/* Page Header */}
//       <header className="bg-white shadow">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Team Evaluation: {teamName}</h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main>
//         <div className="py-6">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-bold mb-4">Rate your teammates:</h1>
//             {remainingTeammates.length > 0 ? (
//               <ul className="mt-4 space-y-4">
//                 {remainingTeammates.map(teammate => (
//                   <li key={teammate._id} className="flex justify-between items-center border-b border-gray-200 pb-2">
//                     <span className="text-lg">{teammate.firstName} {teammate.lastName}</span>
//                     <button onClick={() => handleRateTeammate(teammate)} className="inline-flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-2 text-lg transform transition-transform duration-200 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-500 hover:scale-105">Rate</button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <div className="flex flex-col items-center justify-center text-center mt-8 bg-gray-100 p-6 border border-gray-200 rounded-lg shadow-lg max-w-xl mx-auto">
//                 <h3 className="text-2xl font-bold mb-2">Submission Confirmed!</h3>
//                 <p className="text-lg">All teammates have been rated!</p>
//                 <p className="text-lg">Thank you for submitting your peer assessment.</p>
//               </div>
//             )}
//             <button onClick={handleGoBack} className="mt-6 inline-flex items-center justify-center rounded-md bg-gray-200 text-black px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-transform transform hover:scale-105">Go Back to Student Dashboard page</button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Cooperation;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import { userNavigation } from '<source />navigation';

const Cooperation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        selectedTeammates = [],
        teamName = '',
        teamId,
        updatedTeammates,
    } = location.state || {};
    const [remainingTeammates, setRemainingTeammates] = useState(
        updatedTeammates || selectedTeammates
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleGoBack = () => {
        navigate(`/Student_Dashboard`);
    };

    const handleRateTeammate = (teammate) => {
        navigate(`/PeerRating/${teamId}/${teammate._id}`, {
            state: {
                teammate,
                remainingTeammates: remainingTeammates.filter(
                    (t) => t._id !== teammate._id
                ),
                teamId,
                teamName,
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">
            {/* Page Header */}
            <div className=" mt-6 max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-100">
                    Team Evaluation: {teamName}
                </h1>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                <h2 className="text-xl font-semibold mb-4">
                    Rate Your Teammates
                </h2>
                {remainingTeammates.length > 0 ? (
                    <ul className="space-y-6">
                        {remainingTeammates.map((teammate) => (
                            <li
                                key={teammate._id}
                                className="p-4 rounded-lg shadow-md border border-gray-200 glass flex justify-between items-center"
                            >
                                <span className="text-lg">
                                    {teammate.firstName} {teammate.lastName}
                                </span>
                                <button
                                    onClick={() => handleRateTeammate(teammate)}
                                    className="bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                                >
                                    Rate
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
                        <h3 className="text-2xl font-bold mb-2 text-gray-100">
                            Submission Confirmed!
                        </h3>
                        <p className="text-lg text-gray-300">
                            All teammates have been rated. Thank you for your
                            submission!
                        </p>
                    </div>
                )}

                <button
                    onClick={handleGoBack}
                    className="mt-6 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 border border-transparent hover:border-black transition"
                >
                    Back to Dashboard
                </button>
            </main>
        </div>
    );
};

export default Cooperation;
