import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

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
        <Route path="/" element={<Login />} />  {/* Redirect root to login */}
      </Routes>
    </Router>
  );
};

export default App;
