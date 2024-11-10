import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchRooms = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token sent:', token);
            const response = await axios.get('http://localhost:5001/study-rooms', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            });
            console.log("Fetched Rooms:", response.data); 
          setRooms(response.data);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        } finally {
          setLoading(false);
        }
      };
      
    fetchRooms();
  }, []);

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Study Rooms</h1>
      {rooms.length > 0 ? (
        rooms.map(room => (
          <div key={room._id} className="p-4 border rounded-lg mb-2">
            <h2 className="text-xl">{room.roomName}</h2>
            <p>Capacity: {room.capacity}</p>
            <Link to={`/BookRoom/${room._id}`} className="text-blue-500">
              Book Room
            </Link>
          </div>
        ))
      ) : (
        <p>No rooms available</p>
      )}
    </div>
  );
};

export default RoomList;
