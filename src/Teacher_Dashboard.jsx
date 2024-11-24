import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/teacher/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacher(response.data);

      const teamsResponse = await axios.get('http://localhost:5001/teacher/teams', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams(teamsResponse.data);
    } catch (error) {
      console.error('Error fetching teacher data', error);
    }
  };

  const handleCreateTeam = () => {
    navigate('/teams'); // Navigate to the 'Teams' page to create teams
  };

  const handleDeleteTeam = async (teamId, teamName) => {
    if (window.confirm(`Are you sure you want to delete the team "${teamName}"?`)) {
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

  if (!teacher) return <p>Loading...</p>;

  return (
    <>
      <div className="">

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold">Welcome, {teacher.firstName} {teacher.lastName}</h1>
            <p>Email: {teacher.email}</p>
            <p>Role: {teacher.role}</p>

            <h2 className="text-xl font-semibold mt-4">Your Teams:</h2>
            <ul className="mt-2 space-y-2">
              {teams.length > 0 ? (
                teams.map((team) => (
                  <li key={team.id} className="border rounded-md p-4 shadow-md bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">{team.name}</h3>
                        <p className="text-gray-600 mt-1">Students:</p>
                        {team.students.length > 0 ? (
                          <ul className="list-disc list-inside ml-4 mt-1">
                            {team.students.map((student) => (
                              <li key={student._id} className="text-gray-700">
                                {student.firstName} {student.lastName}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500">No students in this team.</p>
                        )}
                      </div>

                      {/* Button Container with Centered Layout */}
                      <div className="space-y-2 flex flex-col items-center">
                        <button 
                          onClick={() => navigate(`/summary/${team.id}`, { state: { teamName: team.name } })}
                          className="flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-2 text-sm font-medium transform transition-transform duration-200 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-500 hover:scale-105"
                        >
                          Display Team's Results
                        </button>
                        <button 
                            onClick={() => handleDeleteTeam(team.id, team.name)}
                            className="flex items-center justify-center rounded-md bg-gray-200 text-black px-4 py-2 text-sm font-medium transform transition-transform duration-200 hover:bg-gray-300 hover:scale-105"
                          >
                            Delete Team
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No teams found.</li>
              )}
            </ul>

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
