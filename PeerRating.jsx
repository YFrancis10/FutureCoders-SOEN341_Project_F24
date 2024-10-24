import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PeerRating = () => {
  const { teamId, studentId } = useParams(); // Get teamId and studentId from the URL
  const [cooperation, setCooperation] = useState('');
  const [comment, setComment] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.get(`http://localhost:5001/students/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data', error);
        setError('Failed to load student data.');
      }
    };

    fetchStudentData();
  }, [studentId]);

  const submitRating = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5001/teams/${teamId}/ratings`,
        { rateeId: studentId, cooperation, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Redirect to the confirm submission page after successful submission
      navigate('/confirm-submission');
    } catch (error) {
      console.error('Error submitting rating:', error.response || error.message);
      alert('Failed to submit rating.');
    }
  };
  

  if (error) return <p>{error}</p>;
  if (!student) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">Rate {student.firstName} {student.lastName}</h2>
      <div className="mb-4">
        <label htmlFor="cooperation" className="block text-sm font-medium text-gray-700">
          Cooperation Rating (1-5)
        </label>
        <select
          id="cooperation"
          value={cooperation}
          onChange={(e) => setCooperation(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="" disabled>Select a rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          id="comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Add your feedback here"
        />
      </div>
      <button
        onClick={submitRating}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit Rating
      </button>
    </div>
  );
};

export default PeerRating;
