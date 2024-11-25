import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
import YourProfile from './YourProfile';
import EditProfile from './EditProfile';

const Layout = ({ children, pageTitle }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the menu

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Navigate to login on logout
  };

  const goToProfile = () => {
    navigate('/your-profile'); // Navigate to the profile page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* Top bar with logo and buttons */}
      <header className="bg-black h-24">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center justify-center h-full mt-20 pt-9">
            <div className="h-40 w-40 bg-logo-bg bg-contain bg-no-repeat"></div>
          </div>

          {/* Title in the center */}
          <div className="flex-grow text-center">
            <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
          </div>

          {/* Hamburger menu */}
          <div className="relative">
            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none hover:text-gray-400"
            >
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </div>
            </button>

            {/* Dropdown menu when open */}
            {menuOpen && (
              <div className="absolute top-19 left-1/2 transform -translate-x-1/2 bg-gray-900 p-4 rounded-md shadow-lg flex flex-col space-y-4 w-48 z-50">
                <button
                  onClick={goToProfile}
                  className="text-sm font-medium text-white bg-black px-4 py-2 rounded-md border border-transparent hover:border-white transition duration-300"
                >
                  Your Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-black bg-white px-4 py-2 rounded-md border border-transparent hover:border-black transition duration-300"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main>{children}</main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes without Layout (no top bar) */}
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Email" element={<Email />} />
        <Route path="/password-change" element={<PasswordChange />} />
        
        {/* Private routes with Layout (top bar included) */}
        <Route path="/Student_Dashboard" element={<Layout pageTitle="Student Dashboard"><StudentDashboard /></Layout>} />
        <Route path="/Teacher_Dashboard" element={<Layout pageTitle="Teacher Dashboard"><TeacherDashboard /></Layout>} />
        <Route path="/Team_Evaluation/:id" element={<Layout pageTitle="Team Evaluation"><TeamEvaluation /></Layout>} />
        <Route path="/Cooperation" element={<Layout pageTitle=""><Cooperation /></Layout>} />
        <Route path="/PeerRating/:teamId/:studentId" element={<Layout pageTitle="Peer Rating"><PeerRating /></Layout>} />
        <Route path="/Teams" element={<Layout pageTitle="Teams"><Teams /></Layout>} />
        <Route path="/summary/:teamId" element={<Layout pageTitle="Summary"><Summary /></Layout>} />
        <Route path="/RoomList" element={<Layout pageTitle="Room List"><RoomList /></Layout>} />
        <Route path="/BookRoom/:roomId" element={<Layout pageTitle="Book Room"><BookRoom /></Layout>} />
        <Route path="/teams/:teamId/detailed-results" element={<Layout pageTitle="Detailed Results"><DetailedResults /></Layout>} />

        {/* Profile route */}
        <Route path="/your-profile" element={<Layout pageTitle=""><YourProfile /></Layout>} />
        <Route path="/edit-profile" element={<Layout pageTitle=""><EditProfile /></Layout>} />
        {/* Default route */}
        <Route path="/" element={<Navigate to="/Login" />} />
      </Routes>
    </Router>
  );
};

export default App;