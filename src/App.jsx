import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RoleSelection from './RoleSelection';
import Teacher_login from './Teacher_login';
import Student_login from './Student_login';
import SignUp from './SignUp';
import Teacher_dashboard from './Teacher_dashboard';
import Student_dashboard from './Student_dashboard';
import Teams from './Teams';
=======
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import StudentDashboard from './Student_Dashboard'; 
import TeacherDashboard from './Teacher_Dashboard';

>>>>>>> 793edd40440d7f829c70c6d8f3dba845f31f6572

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/teacher-login" element={<Teacher_login />} />
        <Route path="/student-login" element={<Student_login />} />
        <Route path="/teacher-dashboard" element={<Teacher_dashboard />} />
        <Route path="/student-dashboard" element={<Student_dashboard />} />
        <Route path="/teams" element={<Teams />} />
=======
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Student_Dashboard" element={<StudentDashboard />} />
        <Route path="/Teacher_Dashboard" element={<TeacherDashboard />} />
        <Route path="/" element={<Login />} />  {/* Redirect root to login */}
>>>>>>> 793edd40440d7f829c70c6d8f3dba845f31f6572
      </Routes>
    </Router>
  );
}

export default App;