// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PasswordChange = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { email } = location.state || {}; // Retrieve the email passed from Email.jsx

//   React.useEffect(() => {
//     console.log("Email in PasswordChange:", email);
//   }, [email]);

//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState({ text: '', type: '' });

//   const handlePasswordChange = async (e) => {
//     e.preventDefault(); // Prevent form submission

//     if (newPassword !== confirmPassword) {
//       setMessage({ text: 'Passwords do not match. Please try again.', type: 'error' });
//       return;
//     }

//     try {
//       // Send a request to update the user's password in the database
//       const response = await axios.post('http://localhost:5001/change-password', {
//         email,
//         password: newPassword,
//       });

//       if (response.status === 200 && response.data.success) {
//         setMessage({ text: 'Password changed successfully!', type: 'success' });
        
//         // Redirect to login page after a short delay
//         setTimeout(() => {
//           navigate('/Login');
//         }, 2000);
//       }
//     } catch (error) {
//       setMessage({
//         text: error.response?.data.message || 'An error occurred while updating the password.',
//         type: 'error',
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-400">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Change Password</h2>

//         {/* The form */}
//         <form onSubmit={handlePasswordChange}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Choose a new password</label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••••"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Confirm your new password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••••"
//               required
//             />
//           </div>
//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg transition-transform duration-300"
//           >
//             Change Password
//           </button>
//         </form>

//         {/* Feedback message with conditional styling */}
//         {message.text && (
//           <div className={`mt-4 text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
//             {message.type === 'error' ? '❌' : '✅'}
//             {message.text}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PasswordChange;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordChange = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Retrieve the email passed from Email.jsx

  React.useEffect(() => {
    console.log("Email in PasswordChange:", email);
  }, [email]);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match. Please try again.', type: 'error' });
      return;
    }

    try {
      // Send a request to update the user's password in the database
      const response = await axios.post('http://localhost:5001/change-password', {
        email,
        password: newPassword,
      });

      if (response.status === 200 && response.data.success) {
        setMessage({ text: 'Password changed successfully!', type: 'success' });
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/Login');
        }, 2000);
      }
    } catch (error) {
      setMessage({
        text: error.response?.data.message || 'An error occurred while updating the password.',
        type: 'error',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-auth-bg bg-cover bg-center tracking-wider">
      <div className="w-11/12 sm:w-5/12 md:w-3/12 text-sm glass">
        <div className='w-full text-center my-3'>
          <h2 className="text-black font-medium text-xl">Change Password</h2>

          {/* The form */}
          <form onSubmit={handlePasswordChange} className='my-2'>

            <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-11/12 bg-transparent outline-none placeholder-black"
                placeholder="New Password"
                required
              />
              <div className="flex items-center justify-center">
                <i className="fa-solid fa-lock text-xl"></i>
              </div>
            </div>

            <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-11/12 bg-transparent outline-none placeholder-black"
                placeholder="Confirm Password"
                required
              />
              <div className="flex items-center justify-center">
                <i className="fa-solid fa-lock text-xl"></i>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mx-5 my-7 py-2">
              <button
                type="submit"
                className="bg-black w-full h-[35px] text-white rounded-md border border-transparent hover:border-white transition duration-300"
              >
                Change Password
              </button>
            </div>
          </form>

          {/* Feedback message with conditional styling */}
          {message.text && (
            <div className={`mt-4 text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message.type === 'error' ? '❌' : '✅'}
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
