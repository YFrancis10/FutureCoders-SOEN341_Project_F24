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
                setMessage({
                    text: data.message || 'An error occurred',
                    type: 'error',
                });
            }
        } catch (error) {
            // Display error message for incorrect email/password
            setMessage({
                text:
                    error.response?.data.message ||
                    'Incorrect email or password',
                type: 'error',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-auth-bg bg-cover bg-center tracking-wider">
            <div className="w-11/12 sm:w-5/12 md:w-3/12 text-sm glass">
                <div className="w-full text-center my-3">
                    <h2 className="text-2x1 text-black font-medium text-xl">
                        Log In
                    </h2>

                    {/* The form */}
                    <form onSubmit={handleLogin} className="my-2">
                        <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                            <input
                                data-testid="couriel"
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                required
                            />
                            <div className="flex items-center justify-center">
                                <i className="fa-solid fa-envelope text-xl"></i>
                            </div>
                        </div>

                        <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                            <input
                                type="password"
                                data-testid="pass"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                required
                            />
                            <div className="flex items-center justify-center">
                                <i className="fa-solid fa-lock text-xl"></i>
                            </div>
                        </div>

                        <div className="flex items-center justify-center mx-5 cursor-pointer tracking-wider text-sm">
                            <p
                                onClick={() => navigate('/Email')}
                                className="text-black hover:underline cursor-pointer"
                                data-testid="courrier"
                            >
                                Forgot Password?
                            </p>
                        </div>

                        {/* Login Button */}
                        <div className="mx-5 my-7 py-2">
                            <button
                                type="submit"
                                className="bg-black w-full h-[35px] text-white rounded-md border border-transparent hover:border-white transition duration-300"
                                data-testid="soumettre"
                            >
                                Log In
                            </button>
                        </div>
                    </form>

                    {/* Feedback message with conditional styling */}
                    {message.text && (
                        <div
                            className={`mt-4 text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
                            data-testid="soumettre"
                        >
                            {message.type === 'error' ? '❌' : '✅'}{' '}
                            {/* Red "X" for error, check mark for success */}
                            {message.text}
                        </div>
                    )}

                    {/* Navigation link */}
                    <div className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer">
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <span
                                className="text-blue-600 cursor-pointer hover:underline"
                                onClick={() => navigate('/Signup')}
                                data-testid="hello"
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

export default Login;
