// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Email = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState({ text: '', type: '' });

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault(); // Prevent form submission

//     try {
//       const response = await axios.post('http://localhost:5001/check-email', { email });

//       if (response.status === 200 && response.data.success) {
//         setMessage({ text: 'Please check your email to reset your password.', type: 'success' });
//         console.log("Navigating to PasswordChange with email:", email);

//         navigate('/password-change', { state: { email } });
//       }
//     } catch (error) {
//       setMessage({
//         text: error.response?.data.message || 'An error occurred while checking the email.',
//         type: 'error',
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-400">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Forgot your Password?</h2>

//         {/* The form */}
//         <form onSubmit={handleEmailSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email address</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="example@example.com"
//               required
//             />
//           </div>
//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg transition-transform duration-300"
//           >
//             Reset password
//           </button>
//         </form>

//         {/* Feedback message with conditional styling */}
//         {message.text && (
//           <div className={`mt-4 text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
//             {message.type === 'error' ? '❌' : '✅'} {/* Red "X" for error, check mark for success */}
//             {message.text}
//           </div>
//         )}

//         {/* Navigation link */}
//         <p className="mt-4 text-center text-gray-600">
//           Remembered your password?{' '}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline transition duration-200 ease-in-out"
//             onClick={() => navigate('/Login')}
//           >
//             Log In
//           </span>
//         </p>

//         {/* Navigation link */}
//         <p className="mt-4 text-center text-gray-600">
//         Don't have an account?{' '}
//         <span
//         className="text-blue-600 cursor-pointer hover:underline transition duration-200 ease-in-out"
//         onClick={() => navigate('/Signup')}
//         >
//         Sign Up
//      </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Email;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Email = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleEmailSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission

        try {
            const response = await axios.post(
                'http://localhost:5001/check-email',
                { email }
            );

            if (response.status === 200 && response.data.success) {
                setMessage({
                    text: 'Please check your email to reset your password.',
                    type: 'success',
                });
                console.log('Navigating to PasswordChange with email:', email);

                navigate('/password-change', { state: { email } });
            }
        } catch (error) {
            setMessage({
                text:
                    error.response?.data.message ||
                    'An error occurred while checking the email.',
                type: 'error',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-auth-bg bg-cover bg-center tracking-wider">
            <div className="w-11/12 sm:w-5/12 md:w-3/12 text-sm glass">
                <div className="w-full text-center my-3">
                    <h2 className="text-2xl text-black font-medium text-xl">
                        Forgot your Password?
                    </h2>

                    {/* The form */}
                    <form onSubmit={handleEmailSubmit} className="my-2">
                        <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                placeholder="example@example.com"
                                required
                            />
                            <div className="flex items-center justify-center">
                                <i className="fa-solid fa-envelope text-xl"></i>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mx-5 my-7 py-2">
                            <button
                                type="submit"
                                className="bg-black w-full h-[35px] text-white rounded-md border border-transparent hover:border-white transition duration-300"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>

                    {/* Feedback message with conditional styling */}
                    {message.text && (
                        <div
                            className={`mt-4 text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
                        >
                            {message.type === 'error' ? '❌' : '✅'}
                            {message.text}
                        </div>
                    )}

                    {/* Navigation link */}
                    <div className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer">
                        <p className="text-sm">
                            Remembered your password?{' '}
                            <span
                                className="text-blue-600 cursor-pointer hover:underline"
                                onClick={() => navigate('/Login')}
                            >
                                Log In
                            </span>
                        </p>
                    </div>

                    {/* Navigation link */}
                    <div className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer">
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <span
                                className="text-blue-600 cursor-pointer hover:underline"
                                onClick={() => navigate('/Signup')}
                            >
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Email;
