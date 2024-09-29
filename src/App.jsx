import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RoleSelection from './RoleSelection';
import Teacher_login from './Teacher_login';
import Student_login from './Student_login';
import SignUp from './SignUp';
import Teacher_dashboard from './Teacher_dashboard';
import Student_dashboard from './Student_dashboard';
import Teams from './Teams';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/teacher-login" element={<Teacher_login />} />
        <Route path="/student-login" element={<Student_login />} />
        <Route path="/teacher-dashboard" element={<Teacher_dashboard />} />
        <Route path="/student-dashboard" element={<Student_dashboard />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </Router>
  );
}

export default App;