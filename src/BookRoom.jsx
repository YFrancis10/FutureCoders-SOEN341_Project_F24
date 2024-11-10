// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const BookRoom = () => {
// //   const [selectedRoom, setSelectedRoom] = useState(null);
// //   const [bookingDate, setBookingDate] = useState('');
// //   const [bookingTime, setBookingTime] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const rooms = Array.from({ length: 10 }, (_, i) => `Room ${i + 1}`);
// //   const timeSlots = [
// //     '09:00 AM - 10:00 AM',
// //     '10:00 AM - 11:00 AM',
// //     '11:00 AM - 12:00 PM',
// //     '01:00 PM - 02:00 PM',
// //     '02:00 PM - 03:00 PM',
// //     '03:00 PM - 04:00 PM',
// //   ];

// //   const handleRoomSelect = (room) => {
// //     setSelectedRoom(room);
// //     setBookingDate('');
// //     setBookingTime('');
// //   };

// //   const handleBookingSubmit = async () => {
// //     if (!selectedRoom || !bookingDate || !bookingTime) {
// //       setErrorMessage('Please select a room, date, and time.');
// //       return;
// //     }

// //     const token = localStorage.getItem('token');
// //     try {
// //       const response = await axios.post(
// //         'http://localhost:5001/book-room',
// //         {
// //           room: selectedRoom,
// //           date: bookingDate,
// //           time: bookingTime,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setSuccessMessage('Room booked successfully!');
// //       setErrorMessage('');
// //     } catch (error) {
// //       console.error('Error booking room:', error);
// //       setErrorMessage('Failed to book room. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-6">
// //       <h1 className="text-2xl font-bold mb-4">Book a Study Room</h1>
// //       <div className="grid grid-cols-2 gap-4">
// //         {rooms.map((room) => (
// //           <button
// //             key={room}
// //             onClick={() => handleRoomSelect(room)}
// //             className={`p-4 rounded-lg ${
// //               selectedRoom === room ? 'bg-blue-500 text-white' : 'bg-gray-200'
// //             } hover:bg-blue-300`}
// //           >
// //             {room}
// //           </button>
// //         ))}
// //       </div>

// //       {selectedRoom && (
// //         <div className="mt-6">
// //           <h2 className="text-xl font-semibold">Booking Details for {selectedRoom}</h2>
// //           <div className="mt-4">
// //             <label className="block text-sm font-medium text-gray-700">
// //               Select Date:
// //             </label>
// //             <input
// //               type="date"
// //               value={bookingDate}
// //               onChange={(e) => setBookingDate(e.target.value)}
// //               className="mt-1 block w-full p-2 border rounded-md"
// //             />
// //           </div>

// //           <div className="mt-4">
// //             <label className="block text-sm font-medium text-gray-700">
// //               Select Time Slot:
// //             </label>
// //             <select
// //               value={bookingTime}
// //               onChange={(e) => setBookingTime(e.target.value)}
// //               className="mt-1 block w-full p-2 border rounded-md"
// //             >
// //               <option value="">Select a time slot</option>
// //               {timeSlots.map((slot, index) => (
// //                 <option key={index} value={slot}>
// //                   {slot}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <button
// //             onClick={handleBookingSubmit}
// //             className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
// //           >
// //             Book Room
// //           </button>

// //           {successMessage && (
// //             <p className="mt-4 text-green-600">{successMessage}</p>
// //           )}
// //           {errorMessage && (
// //             <p className="mt-4 text-red-600">{errorMessage}</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BookRoom;

// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';

// // // const BookRoom = () => {
// // //   const [availableRooms, setAvailableRooms] = useState([]);
// // //   const [selectedRoom, setSelectedRoom] = useState(null);
// // //   const [startTime, setStartTime] = useState('');
// // //   const [endTime, setEndTime] = useState('');
// // //   const [error, setError] = useState('');
// // //   const [successMessage, setSuccessMessage] = useState('');
// // //   const navigate = useNavigate();

// // //   // Fetch available rooms based on the selected time range
// // //   const fetchAvailableRooms = async () => {
// // //     if (!startTime || !endTime) {
// // //       setError('Please select both start and end time.');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch(`/study-rooms/available?startTime=${startTime}&endTime=${endTime}`, {
// // //         headers: {
// // //           'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //         },
// // //       });
// // //       const data = await response.json();
// // //       if (response.ok) {
// // //         setAvailableRooms(data);
// // //         setError('');
// // //       } else {
// // //         setError(data.message || 'Failed to fetch available rooms.');
// // //       }
// // //     } catch (err) {
// // //       setError('An error occurred while fetching available rooms.');
// // //     }
// // //   };

// // //   // Handle room booking submission
// // //   const handleBooking = async () => {
// // //     if (!selectedRoom || !startTime || !endTime) {
// // //       setError('Please select a room and time.');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch(`/study-rooms/${selectedRoom}/book`, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //         },
// // //         body: JSON.stringify({
// // //           startTime,
// // //           endTime,
// // //         }),
// // //       });
// // //       const data = await response.json();
// // //       if (response.ok) {
// // //         setSuccessMessage('Room booked successfully!');
// // //         setError('');
// // //         // Optionally, navigate to another page after booking
// // //         setTimeout(() => navigate('/student-dashboard'), 2000);
// // //       } else {
// // //         setError(data.message || 'Failed to book room.');
// // //       }
// // //     } catch (err) {
// // //       setError('An error occurred while booking the room.');
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-4">
// // //       <h1 className="text-2xl font-bold mb-4">Book a Study Room</h1>
      
// // //       <div className="mb-4">
// // //         <label htmlFor="startTime" className="block">Start Time</label>
// // //         <input
// // //           type="datetime-local"
// // //           id="startTime"
// // //           value={startTime}
// // //           onChange={(e) => setStartTime(e.target.value)}
// // //           className="border border-gray-300 p-2 rounded"
// // //         />
// // //       </div>

// // //       <div className="mb-4">
// // //         <label htmlFor="endTime" className="block">End Time</label>
// // //         <input
// // //           type="datetime-local"
// // //           id="endTime"
// // //           value={endTime}
// // //           onChange={(e) => setEndTime(e.target.value)}
// // //           className="border border-gray-300 p-2 rounded"
// // //         />
// // //       </div>

// // //       <button
// // //         onClick={fetchAvailableRooms}
// // //         className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
// // //       >
// // //         Check Availability
// // //       </button>

// // //       {error && <div className="mt-4 text-red-500">{error}</div>}
// // //       {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}

// // //       {availableRooms.length > 0 && (
// // //         <div className="mt-6">
// // //           <h2 className="text-xl font-semibold">Available Rooms</h2>
// // //           <ul className="space-y-4 mt-4">
// // //             {availableRooms.map((room) => (
// // //               <li key={room._id} className="border p-4 rounded shadow-lg">
// // //                 <div className="flex justify-between items-center">
// // //                   <span>{room.name}</span>
// // //                   <button
// // //                     onClick={() => setSelectedRoom(room._id)}
// // //                     className={`p-2 rounded ${selectedRoom === room._id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
// // //                   >
// // //                     {selectedRoom === room._id ? 'Selected' : 'Select Room'}
// // //                   </button>
// // //                 </div>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </div>
// // //       )}

// // //       {selectedRoom && (
// // //         <div className="mt-6">
// // //           <button
// // //             onClick={handleBooking}
// // //             className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
// // //           >
// // //             Book Room
// // //           </button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default BookRoom;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BookRoom = () => {
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [bookingDate, setBookingDate] = useState('');
//   const [bookingTime, setBookingTime] = useState('');
//   const [rooms, setRooms] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const timeSlots = [
//     '09:00 AM - 10:00 AM',
//     '10:00 AM - 11:00 AM',
//     '11:00 AM - 12:00 PM',
//     '01:00 PM - 02:00 PM',
//     '02:00 PM - 03:00 PM',
//     '03:00 PM - 04:00 PM',
//   ];

//   // Fetch rooms from the backend
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/study-rooms');
//         setRooms(response.data);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//         setErrorMessage('Failed to fetch rooms. Please try again later.');
//       }
//     };
//     fetchRooms();
//   }, []);

//   const handleRoomSelect = (room) => {
//     setSelectedRoom(room);
//     setBookingDate('');
//     setBookingTime('');
//   };

//   const handleBookingSubmit = async () => {
//     if (!selectedRoom || !bookingDate || !bookingTime) {
//       setErrorMessage('Please select a room, date, and time.');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.post(
//         'http://localhost:5001/book-room',
//         {
//           roomId: selectedRoom._id,
//           date: bookingDate,
//           time: bookingTime,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSuccessMessage('Room booked successfully!');
//       setErrorMessage('');
//       setSelectedRoom(null);
//       setBookingDate('');
//       setBookingTime('');
//     } catch (error) {
//       console.error('Error booking room:', error);
//       setErrorMessage('Failed to book room. Please try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Book a Study Room</h1>
      
//       <div className="grid grid-cols-2 gap-4">
//         {rooms.map((room) => (
//           <button
//             key={room._id}
//             onClick={() => handleRoomSelect(room)}
//             className={`p-4 rounded-lg ${
//               selectedRoom && selectedRoom._id === room._id
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200'
//             } hover:bg-blue-300`}
//           >
//             {room.name}
//           </button>
//         ))}
//       </div>

//       {selectedRoom && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold">Booking Details for {selectedRoom.name}</h2>
          
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">Select Date:</label>
//             <input
//               type="date"
//               value={bookingDate}
//               onChange={(e) => setBookingDate(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">Select Time Slot:</label>
//             <select
//               value={bookingTime}
//               onChange={(e) => setBookingTime(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             >
//               <option value="">Select a time slot</option>
//               {timeSlots.map((slot, index) => (
//                 <option key={index} value={slot}>
//                   {slot}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             onClick={handleBookingSubmit}
//             className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//           >
//             Book Room
//           </button>

//           {successMessage && (
//             <p className="mt-4 text-green-600">{successMessage}</p>
//           )}
//           {errorMessage && (
//             <p className="mt-4 text-red-600">{errorMessage}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookRoom;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [rooms, setRooms] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
  ];

  // Fetch rooms from the backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5001/study-rooms');
        if (response.data && Array.isArray(response.data)) {
          setRooms(response.data);
        } else {
          setErrorMessage('No rooms available at this time.');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setErrorMessage('Failed to fetch rooms. Please try again later.');
      }
    };
    fetchRooms();
  }, []);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setBookingDate('');
    setBookingTime('');
  };

  const handleBookingSubmit = async () => {
    if (!selectedRoom || !bookingDate || !bookingTime) {
      setErrorMessage('Please select a room, date, and time.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5001/book-room',
        {
          roomId: selectedRoom._id,
          date: bookingDate,
          time: bookingTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('Room booked successfully!');
      setErrorMessage('');
      setSelectedRoom(null);
      setBookingDate('');
      setBookingTime('');
    } catch (error) {
      console.error('Error booking room:', error);
      setErrorMessage('Failed to book room. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book a Study Room</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {rooms.map((room) => (
          <button
            key={room._id}
            onClick={() => handleRoomSelect(room)}
            className={`p-4 rounded-lg ${
              selectedRoom && selectedRoom._id === room._id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            } hover:bg-blue-300`}
          >
            {room.name}
          </button>
        ))}
      </div>

      {selectedRoom && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Booking Details for {selectedRoom.name}</h2>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Select Date:</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Select Time Slot:</label>
            <select
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleBookingSubmit}
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Book Room
          </button>

          {successMessage && (
            <p className="mt-4 text-green-600">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="mt-4 text-red-600">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookRoom;
