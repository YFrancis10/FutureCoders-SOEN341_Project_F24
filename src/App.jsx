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
import PeerRating2 from './PeerRating2';
import PeerRating3 from './PeerRating3';
import PeerRating4 from './PeerRating4';
import ConceptualContribution from './ConceptualContribution';
import PracticalContribution from './PracticalContribution';
import WorkEthic from './WorkEthic';
import Summary from './Summary';
import RoomList from './RoomList'; // Import RoomList
import BookRoom from './BookRoom'; // Import BookRoom

const App = () => {
  return (
    <Router>
      <div className="flex justify-center mt-0 space-x-4">
        <Link
          to="/login"
          className="rounded-md bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-transform hover:scale-105"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="rounded-md bg-blue-500 text-white px-4 py-2 text-sm font-medium transition-transform hover:scale-105"
        >
          Sign Up
        </Link>
      </div>

      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Student_Dashboard" element={<StudentDashboard />} />
        <Route path="/Teacher_Dashboard" element={<TeacherDashboard />} />
        <Route path="/Team_Evaluation/:id" element={<TeamEvaluation />} />
        <Route path="/Cooperation" element={<Cooperation />} />
        <Route path="/PeerRating/:teamId/:studentId" element={<PeerRating />} />
        <Route path="/PeerRating2/:teamId/:studentId" element={<PeerRating2 />} />
        <Route path="/PeerRating3/:teamId/:studentId" element={<PeerRating3 />} />
        <Route path="/PeerRating4/:teamId/:studentId" element={<PeerRating4 />} />
        <Route path="/Teams" element={<Teams />} />
        <Route path="/Conceptual_Contribution" element={<ConceptualContribution />} />
        <Route path="/Practical_Contribution" element={<PracticalContribution />} />
        <Route path="/Work_Ethic" element={<WorkEthic />} />
        <Route path="/summary/:teamId" element={<Summary />} />
        <Route path="/RoomList" element={<RoomList />} /> {/* Route for viewing rooms */}
        <Route path="/BookRoom/:roomId" element={<BookRoom />} /> {/* Route for booking a specific room */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
