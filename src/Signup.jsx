import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'student', // Default role
    });
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent form submission

        try {
            const response = await axios.post(
                'http://localhost:5001/Signup',
                formData
            );

            if (response.status === 200) {
                setMessage(response.data.message); // Success message
                alert('Sign up successful!');
                navigate('/login'); // Redirect to login after successful signup
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-auth-bg bg-cover bg-center tracking-wider">
            <div className="w-11/12 sm:w-5/12 md:w-3/12 text-sm glass">
                <div className="w-full text-center my-3">
                    <h2 className="text-2x1 text-black font-medium text-xl">
                        Sign Up
                    </h2>
                    <form onSubmit={handleSignup} className="my-2">
                        <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                            <input
                                type="text"
                                value={formData.firstName}
                                placeholder="First Name"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        firstName: e.target.value,
                                    })
                                }
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                required
                            />
                            <div className="flex items-center justify-center">
                                <i className="fa-solid fa-user text-xl"></i>
                            </div>
                        </div>

                        <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                            <input
                                type="text"
                                value={formData.lastName}
                                placeholder="Last Name"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        lastName: e.target.value,
                                    })
                                }
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                required
                            />
                            <div className="flex items-center justify-center">
                                <i className="fa-solid fa-user text-xl"></i>
                            </div>
                        </div>

                        <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                            <input
                                type="email"
                                value={formData.email}
                                placeholder="Email"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
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
                                value={formData.password}
                                placeholder="Password"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                required
                            />
                            <div className="flex items-center justify-center">
                                <i className="fa-solid fa-lock text-xl"></i>
                            </div>
                        </div>

                        <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                            <label htmlFor="">Role: </label>
                            <select
                                value={formData.role}
                                placeholder="Role"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        role: e.target.value,
                                    })
                                }
                                className="w-11/12 bg-transparent outline-none placeholder-black"
                                required
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <div className="mx-5 my-7 py-2">
                            <button
                                data-testid="cubnit"
                                type="submit"
                                className="bg-black w-full h-[35px] text-white rounded-md border border-transparent hover:border-white transition duration-300"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    {message && (
                        <p className="mt-4 text-center text-red-600">
                            {message}
                        </p>
                    )}{' '}
                    {/* Error message */}
                    <div className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer">
                        <p className="text-sm">
                            Already have an account?{' '}
                            <span
                                className="text-blue-600 cursor-pointer hover:underline"
                                onClick={() => navigate('/login')}
                                data-testid="existing"
                            >
                                Log in
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
