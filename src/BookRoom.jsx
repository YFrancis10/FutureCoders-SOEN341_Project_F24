import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState(null);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/book-room', {
        roomId,
        date,
        startTime,
        endTime
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (response.data.success) {
        setMessage("Room booked successfully!");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error booking room. Please try again.");
      }
    }
  };
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book Study Room</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Book Room
        </button>
      </form>
    </div>
  );
};

export default BookRoom;
