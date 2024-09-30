import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Teams() {
  const [students, setStudents] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/students', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data); // Assuming the endpoint returns a list of students
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/teams', { name: teamName, students: selectedStudents }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Show a success message or redirect
      alert('Team created successfully');
      // Optionally clear the form
      setTeamName('');
      setSelectedStudents([]);
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team. Please try again.');
    }
  };

  return (
    <div className="min-h-full">
      <div className="bg-gradient-to-b from-blue-500 to-blue-400 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Create a New Team</h1>
        </div>
      </div>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter team name"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Select Students:</h2>
              {students.map((student) => (
                <div key={student._id} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={student._id}
                    checked={selectedStudents.includes(student._id)}
                    onChange={() => handleStudentSelect(student._id)}
                    className="mr-2"
                  />
                  <label htmlFor={student._id} className="text-sm">{student.firstName} {student.lastName}</label>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-400 text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Team
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Teams;
