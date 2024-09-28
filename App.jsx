import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RoleSelection from './RoleSelection';
import Teacher_login from './Teacher_login';
import Student_login from './Student_login';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/teacher-login" element={<Teacher_login />} />
        <Route path="/student-login" element={<Student_login />} />
      </Routes>
    </Router>
  );
}

export default App;
