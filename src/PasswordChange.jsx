import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PasswordChange = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email: passedEmail } = location.state || {}; // Email passed from "Forgot Password" flow
    const [email, setEmail] = useState(passedEmail || ''); // Set email from state or initialize empty
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(
                        'http://localhost:5001/profile',
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setEmail(response.data.email); // Fetch email for authenticated user
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error(
                        'Error fetching authenticated user profile:',
                        error
                    );
                }
            }
        };

        if (!passedEmail) {
            // Only check authentication if no email is passed
            checkAuthentication();
        }
    }, [passedEmail]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage({
                text: 'Passwords do not match. Please try again.',
                type: 'error',
            });
            return;
        }

        try {
            const endpoint = isAuthenticated
                ? 'http://localhost:5001/change-password' // For authenticated users
                : 'http://localhost:5001/reset-password'; // For unauthenticated users

            const payload = isAuthenticated
                ? { password: newPassword }
                : { email, password: newPassword }; // Include email only for unauthenticated users

            const headers = isAuthenticated
                ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
                : {};

            const response = await axios.post(endpoint, payload, { headers });

            if (response.status === 200 && response.data.success) {
                setMessage({
                    text: 'Password changed successfully!',
                    type: 'success',
                });

                // Redirect based on context
                setTimeout(() => {
                    navigate(isAuthenticated ? '/your-profile' : '/Login');
                }, 2000);
            }
        } catch (error) {
            setMessage({
                text:
                    error.response?.data.message ||
                    'An error occurred while updating the password.',
                type: 'error',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-400">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    {isAuthenticated ? 'Change Password' : 'Reset Password'}
                </h2>
                <form onSubmit={handlePasswordChange}>
                    {!isAuthenticated && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••••"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg transition-transform duration-300"
                    >
                        {isAuthenticated ? 'Change Password' : 'Reset Password'}
                    </button>
                </form>
                {message.text && (
                    <div
                        className={`mt-4 text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
                    >
                        {message.type === 'error' ? '❌' : '✅'} {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordChange;
