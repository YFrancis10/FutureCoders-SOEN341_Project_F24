import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const YourProfile = () => {
    const [user, setUser] = useState(null);
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

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('http://localhost:5001/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                localStorage.removeItem('token');
                navigate('/login');
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Failed to delete account.');
            }
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200 glass">
          
            <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
            <div className="space-y-2">
                <p>
                    <strong>First Name:</strong> {user.firstName}
                </p>
                <p>
                    <strong>Last Name:</strong> {user.lastName}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Role:</strong> {user.role}
                </p>
                {user.role === 'student' && (
                    <p>
                        <strong>ID:</strong> {user.studentID}
                    </p>
                )}
            </div>
            <div className="mt-4 space-x-4">
                <button
                    onClick={() => navigate('/edit-profile')}
                    className="px-4 py-2 bg-white text-black rounded-md border border-transparent hover:border-black transition duration-300"
                    >
                    Edit Profile
                </button>
                <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-black text-white rounded-md border border-transparent hover:border-white transition duration-300"
                    >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default YourProfile;
