import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await axios.post('http://localhost:5001/Login', {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        // Save the token in local storage
        localStorage.setItem('token', data.token);
        
        // Set success message and navigate to the correct dashboard
        setMessage({ text: 'Login successful!', type: 'success' });
        
        if (data.role === 'student') {
          navigate('/Student_Dashboard');
        } else if (data.role === 'teacher') {
          navigate('/Teacher_Dashboard');
        }
      } else {
        setMessage({ text: data.message || "An error occurred", type: 'error' });
      }
    } catch (error) {
      // Display error message for incorrect email/password
      setMessage({ text: error.response?.data.message || "Incorrect email or password", type: 'error' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-400">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Log In</h2>

        {/* The form */}
        <form onSubmit={handleLogin}data-testid="form">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />3
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg transition-transform duration-300"
          >
            Log In
          </button>
        </form>

        {/* Feedback message with conditional styling */}
        {message.text && (
          <div className={`mt-4 text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
            {message.type === 'error' ? '❌' : '✅'} {/* Red "X" for error, check mark for success */}
            {message.text}
          </div>
        )}

        {/* Navigation link */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline transition duration-200 ease-in-out"
            onClick={() => navigate('/Signup')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;