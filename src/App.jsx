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
      <nav>
        <ul>
          <li>
            <Link to="/Signup">Signup</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>

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