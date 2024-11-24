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
    <div className="">
      {/* Header */}

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

