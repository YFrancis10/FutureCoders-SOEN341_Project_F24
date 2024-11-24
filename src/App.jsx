import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Email from './Email';
import PasswordChange from './PasswordChange';
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
import YourProfile from './YourProfile'; // Import YourProfile component
import EditProfile from './EditProfile'; // Import EditProfile component

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
        <Route path="/RoomList" element={<RoomList />} />
        <Route path="/BookRoom/:roomId" element={<BookRoom />} />
        <Route path="/teams/:teamId/detailed-results" element={<DetailedResults />} />
        <Route path="/your-profile" element={<YourProfile />} /> {/* Add route for YourProfile */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* Add route for EditProfile */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
