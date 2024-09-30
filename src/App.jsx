import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import StudentDashboard from './Student_Dashboard'; 
import TeacherDashboard from './Teacher_Dashboard';
import Teams from './Teams';


const App = () => {
  return (
    <Router>
        <div className="flex justify-center mt-0 space-x-4">
        <a
          href="/login"
          className="rounded-md bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-transform hover:scale-105"
        >
          Log In
        </a>
        <a
          href="/signup"
          className="rounded-md bg-blue-500 text-white px-4 py-2 text-sm font-medium transition-transform hover:scale-105"
        >
          Sign Up
        </a>
      </div>

      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Student_Dashboard" element={<StudentDashboard />} />
        <Route path="/Teacher_Dashboard" element={<TeacherDashboard />} />
        <Route path="/Teams" element={<Teams />} /> {/* Ensure this route exists */}
        <Route path="/" element={<Login />} />  {/* Redirect root to login */}
      </Routes>
    </Router>
  );
};

export default App;