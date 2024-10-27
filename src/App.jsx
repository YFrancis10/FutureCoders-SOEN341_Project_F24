import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import StudentDashboard from './Student_Dashboard'; 
import TeacherDashboard from './Teacher_Dashboard';
import TeamEvaluation from './Team_Evaluation';
import Teams from './Teams';
import Cooperation from './Cooperation';
import PeerRating from './PeerRating';
import ConfirmSubmission from './ConfirmSubmission';


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
        <Route path="/Team_Evaluation/:id" element={<TeamEvaluation />} />
        <Route path="/Cooperation" element={<Cooperation />} />
        <Route path="/Conceptual_Contribution" element={<ConceptualContribution />} />
        <Route path="/Practical_Contribution" element={<PracticalContribution />} />
        <Route path="/WorkEthic" element={<WorkEthic />} />
        <Route path="/PeerRating/:teamId/:studentId" element={<PeerRating />} />
        <Route path="/Teams" element={<Teams />} /> {/* Ensure this route exists */}
        <Route path="/ConfirmSubmission" element={<ConfirmSubmission />} />
        <Route path="/" element={<Login />} />  {/* Redirect root to login */}
      </Routes>
    </Router>
  );
};

export default App;
