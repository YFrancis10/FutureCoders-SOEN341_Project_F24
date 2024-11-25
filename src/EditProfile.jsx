import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:5001/profile',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5001/profile', user, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (newPassword || confirmPassword) {
                if (newPassword !== confirmPassword) {
                    setMessage({
                        text: 'Passwords do not match. Please try again.',
                        type: 'error',
                    });
                    return;
                }

                await axios.post(
                    'http://localhost:5001/change-password',
                    { password: newPassword },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            setMessage({
                text: 'Profile updated successfully!',
                type: 'success',
            });

            // Redirect to dashboard based on user role
            setTimeout(() => {
                navigate(
                    user.role === 'student'
                        ? '/Student_Dashboard'
                        : '/Teacher_Dashboard'
                );
            }, 2000);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({
                text: 'Failed to update profile or password.',
                type: 'error',
            });
        }
    };

    return (
      <div className="max-w-3xl mx-auto p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200 glass">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <form className="space-y-4">
                <div>
                    <label className="block font-medium">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-black"
                    />
                </div>
                <div>
                    <label className="block font-medium">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-black"
                    />
                </div>
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-black"
                    />
                </div>
                <div>
                    <label className="block font-medium ">
                        New Password (Optional)
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-black"
                        placeholder="Enter a new password"
                    />
                </div>
                <div>
                    <label className="block font-medium">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-black"
                        placeholder="Confirm your new password"
                    />
                </div>
            </form>
            {message.text && (
                <p
                    className={`mt-4 ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
                >
                    {message.type === 'error' ? '❌' : '✅'} {message.text}
                </p>
            )}
            <div className="mt-4 space-x-4">
                <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-black text-white rounded-md border border-transparent hover:border-white transition duration-300"
                >
                    Save Changes
                </button>
                <button
                    onClick={() =>
                        navigate(
                            user.role === 'student'
                                ? '/Student_Dashboard'
                                : '/Teacher_Dashboard'
                        )
                    }
                    className="px-4 py-2 bg-white text-black rounded-md border border-transparent hover:border-black transition duration-300"
                >
                    Cancel Changes
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
