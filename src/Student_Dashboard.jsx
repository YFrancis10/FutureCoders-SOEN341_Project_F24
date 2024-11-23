// import React, { useEffect, useState } from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// function StudentDashboard() {
//   const [student, setStudent] = useState(null);
//   const [teams, setTeams] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const token = localStorage.getItem('token'); 
//         const response = await axios.get('http://localhost:5001/student/me', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(response.data);
//       } catch (error) {
//         console.error('Error fetching student data', error);
//         setError('Failed to load student data. Please try again later.');
//       }
//     };

//     fetchStudentData();
//   }, []);

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const token = localStorage.getItem('token'); 
//         const response = await axios.get('http://localhost:5001/student/teams', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTeams(response.data);
//       } catch (error) {
//         console.error('Error fetching teams', error);
//         setError('Failed to load teams. Please try again later.');
//       }
//     };

//     if (student) {
//       fetchTeams();
//     }
//   }, [student]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login'); 
//   };

//   const handleSelectTeam = (team) => {
//     navigate(`/Team_Evaluation/${team._id}`, { state: { team, student } });
//   };

//   const handleBookRoom = (team) => {
//     navigate('/RoomList', { state: { teamName: team.name, teamMembers: team.students } });
//   };

//   if (error) return <p>{error}</p>;
//   if (!student) return <p>Loading...</p>;

//   return (
//     <>
//       <div className="min-h-full">
//         <Disclosure as="nav" className="bg-gradient-to-b from-blue-500 to-blue-400">
//           {({ open }) => (
//             <>
//               <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                 <div className="flex h-16 items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                       <img alt="Your Company" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" className="h-8 w-8" />
//                     </div>
//                     <div className="hidden md:block">
//                       <div className="ml-10 flex items-baseline space-x-4">
//                         <a href="/Student_Dashboard" className="bg-white text-black rounded-md px-3 py-2 text-sm font-medium">Dashboard</a>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="hidden md:block">
//                     <div className="ml-4 flex items-center md:ml-6">
//                       <button
//                         type="button"
//                         className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                       >
//                         <span className="sr-only">View notifications</span>
//                         <BellIcon className="h-6 w-6" aria-hidden="true" />
//                       </button>
//                       <Menu as="div" className="relative ml-3">
//                         <div>
//                           <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                             <span className="sr-only">Open user menu</span>
//                             <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
//                           </Menu.Button>
//                         </div>
//                         <Transition
//                           as={React.Fragment}
//                           enter="transition ease-out duration-100"
//                           enterFrom="transform opacity-0 scale-95"
//                           enterTo="transform opacity-100 scale-100"
//                           leave="transition ease-in duration-75"
//                           leaveFrom="transform opacity-100 scale-100"
//                           leaveTo="transform opacity-0 scale-95"
//                         >
//                           <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                             <Menu.Item>
//                               {({ active }) => (
//                                 <button
//                                   onClick={handleLogout}
//                                   className={classNames(
//                                     active ? 'bg-gray-100' : '',
//                                     'block px-4 py-2 text-sm text-gray-700 w-full text-left'
//                                   )}
//                                 >
//                                   Sign out
//                                 </button>
//                               )}
//                             </Menu.Item>
//                           </Menu.Items>
//                         </Transition>
//                       </Menu>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </Disclosure>

//         <header className="bg-white shadow">
//           <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">Student's Dashboard</h1>
//           </div>
//         </header>

//         <main>
//           <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//             <h1>Welcome, {student.firstName} {student.lastName}</h1>
//             <p>Email: {student.email}</p>
//             <p>Role: {student.role}</p>
//             <p>Student ID: {student.studentID}</p>

//             <h2 className="mt-6 text-2xl font-semibold">Your Teams</h2>
//             <div className="mt-4 space-y-4">
//               {teams.length > 0 ? (
//                 teams.map((team) => (
//                   <div key={team._id} className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200 hover:bg-gray-200 transition duration-150 ease-in-out">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h3 className="text-lg font-semibold">{team.name}</h3>
//                         <p className="text-sm text-gray-600 mt-1">
//                           Students: 
//                           {team.students.length > 0 ? (
//                             <ul className="list-disc list-inside ml-4 mt-1">
//                               {team.students.map((s) => (
//                                 <li key={s._id} className="text-gray-700">{s.firstName} {s.lastName}</li>
//                               ))}
//                             </ul>
//                           ) : (
//                             <span className="text-gray-500"> No students in this team.</span>
//                           )}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-center space-y-2">
//                         <button 
//                           onClick={() => handleSelectTeam(team)}
//                           className="rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-2 text-sm font-medium transition-transform duration-200 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-500 hover:scale-105"
//                         >
//                           Evaluate Team
//                         </button>
//                         <button
//                           onClick={() => handleBookRoom(team)}
//                           className="rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-2 text-sm font-medium transition-transform duration-200 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-500 hover:scale-105"
//                         >
//                           Book a Study Room
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No teams found.</p>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

// export default StudentDashboard;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function StudentDashboard() {
//   const [student, setStudent] = useState(null);
//   const [teams, setTeams] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5001/student/me', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(response.data);
//       } catch (error) {
//         console.error('Error fetching student data', error);
//         setError('Failed to load student data. Please try again later.');
//       }
//     };

//     fetchStudentData();
//   }, []);

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5001/student/teams', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTeams(response.data);
//       } catch (error) {
//         console.error('Error fetching teams', error);
//         setError('Failed to load teams. Please try again later.');
//       }
//     };

//     if (student) {
//       fetchTeams();
//     }
//   }, [student]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const handleSelectTeam = (team) => {
//     navigate(`/Team_Evaluation/${team._id}`, { state: { team, student } });
//   };

//   const handleBookRoom = (team) => {
//     navigate('/RoomList', { state: { teamName: team.name, teamMembers: team.students } });
//   };

//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//   if (!student) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
//       {/* Header */}
//       <header className="bg-black">
//         <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="text-sm font-medium text-black bg-white px-4 py-2 rounded-md hover:bg-red-600 transition"
//           >
//             Log out
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6">
//         {/* Student Info */}
//         <section className="bg-white p-6 rounded-lg shadow-md mb-6 glass">
//           <h2 className="text-lg font-semibold text-gray-800">Welcome, {student.firstName} {student.lastName}</h2>
//           <p className="text-gray-600">Email: {student.email}</p>
//           <p className="text-gray-600">Role: {student.role}</p>
//           <p className="text-gray-600">Student ID: {student.studentID}</p>
//         </section>

//         {/* Teams Section */}
//         <section>
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Teams</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {teams.length > 0 ? (
//               teams.map((team) => (
//                 <div
//                   key={team._id}
//                   className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 glass"
//                 >
//                   <h3 className="text-lg font-medium text-gray-800 mb-2">{team.name}</h3>
//                   <p className="text-gray-600 mb-3">
//                     Students:
//                     {team.students.length > 0 ? (
//                       <ul className="list-disc list-inside ml-4">
//                         {team.students.map((s) => (
//                           <li key={s._id} className="text-gray-700">{s.firstName} {s.lastName}</li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <span className="text-gray-500"> No students in this team.</span>
//                     )}
//                   </p>
//                   <div className="flex flex-col gap-2">
//                     <button
//                       onClick={() => handleSelectTeam(team)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
//                     >
//                       Evaluate Team
//                     </button>
//                     <button
//                       onClick={() => handleBookRoom(team)}
//                       className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition"
//                     >
//                       Book a Study Room
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600">No teams found.</p>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default StudentDashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/student/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data', error);
        setError('Failed to load student data. Please try again later.');
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/student/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams', error);
        setError('Failed to load teams. Please try again later.');
      }
    };

    if (student) {
      fetchTeams();
    }
  }, [student]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSelectTeam = (team) => {
    navigate(`/Team_Evaluation/${team._id}`, { state: { team, student } });
  };

  const handleBookRoom = (team) => {
    navigate('/RoomList', { state: { teamName: team.name, teamMembers: team.students } });
  };

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!student) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* Header */}
      <header className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-black bg-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Student Info */}
        <section className="p-6 rounded-lg shadow-md mb-6 glass">
          <h2 className="text-lg font-semibold text-gray-100">Welcome, {student.firstName} {student.lastName}</h2>
          <p className="text-gray-300">Email: {student.email}</p>
          <p className="text-gray-300">Role: {student.role}</p>
          <p className="text-gray-300">Student ID: {student.studentID}</p>
        </section>

        {/* Teams Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Your Teams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.length > 0 ? (
              teams.map((team) => (
                <div
                  key={team._id}
                  className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 glass"
                >
                  <h3 className="text-lg font-medium text-gray-100 mb-2">{team.name}</h3>
                  <p className="text-gray-300 mb-3">
                    Students:
                    {team.students.length > 0 ? (
                      <ul className="list-disc list-inside ml-4 text-gray-200">
                        {team.students.map((s) => (
                          <li key={s._id}>{s.firstName} {s.lastName}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500"> No students in this team.</span>
                    )}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleSelectTeam(team)}
                      className="bg-black text-white px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                    >
                      Evaluate Team
                    </button>
                    <button
                      onClick={() => handleBookRoom(team)}
                      className="bg-white text-black px-4 py-2 rounded-md border border-transparent hover:border-black transition duration-300"
                    >
                      Book a Study Room
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-300">No teams found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;

