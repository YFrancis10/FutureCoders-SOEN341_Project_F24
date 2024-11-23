import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Email from './Email';
import PasswordChange from "./PasswordChange";
import StudentDashboard from './Student_Dashboard';
import TeacherDashboard from './Teacher_Dashboard';
import TeamEvaluation from './Team_Evaluation';
import Teams from './Teams';
import Cooperation from './Cooperation';
import PeerRating from './PeerRating';
import Summary from './Summary';
import RoomList from './RoomList'; 
import BookRoom from './BookRoom'; 
import DetailedResults from './DetailedResults';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Email" element={<Email />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/Student_Dashboard" element={<StudentDashboard />} />
        <Route path="/Teacher_Dashboard" element={<TeacherDashboard />} />
        <Route path="/Team_Evaluation/:id" element={<TeamEvaluation />} />
        <Route path="/Cooperation" element={<Cooperation />} />
        <Route path="/PeerRating/:teamId/:studentId" element={<PeerRating />} />
        <Route path="/Teams" element={<Teams />} />
        <Route path="/summary/:teamId" element={<Summary />} />
        <Route path="/RoomList" element={<RoomList />} /> {/* Route for viewing rooms */}
        <Route path="/BookRoom/:roomId" element={<BookRoom />} /> {/* Route for booking a specific room */}
        <Route path="/teams/:teamId/detailed-results" element={<DetailedResults />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
