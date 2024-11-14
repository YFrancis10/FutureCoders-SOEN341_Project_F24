import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
  }));

describe('Log-in Page', () => {
  const mockNavigate = jest.fn();
  

  beforeEach(() => {
    jest.clearAllMocks();
    useState.mockImplementation(jest.requireActual('react').useState);
  });

  it('renders loading state initially', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    //expect(screen.get
  });
  it("submits", async () => {
    const handleSubmit = jest.fn();
    render(<Router> <Login onSubmit={handleSubmit} /> </Router>);
    const rangeinput=screen.getByLabelText('Email');
    const rangeinput2=screen.getByLabelText('Password');
    fireEvent.change(rangeinput,{target:{value: 'email'}});
    fireEvent.change(rangeinput2,{target:{value: 'password'}});
    
    const huh = screen.getByLabelText("Log In");
    fireEvent.click(huh);

    //axios.post.mockImplementationOnce(()=>Promise.resolve({data:["hello"]}, {status:["400"]}));
    expect(screen.getByText(/Incorrect email or password/i)).toBeInTheDocument();
    useState.mockImplementationOnce(()=>[]);

  });
  /*it('Bad log in', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ status:  }))

    render(
      <Router>
        <Login />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Incorrect email or password/i)).toBeInTheDocument();
    });
  });*/

});

/*


  it('displays an error message if student data fails to load', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <Router>
        <StudentDashboard />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load student data. Please try again later./i)).toBeInTheDocument();
    });
  });

  it('displays student information when fetched successfully', async () => {
    const studentData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'Student',
      studentID: '12345',
    };
    axios.get.mockResolvedValueOnce({ data: studentData });

    render(
      <Router>
        <StudentDashboard />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Email: john.doe@example.com/i)).toBeInTheDocument();
    });
  });

  it('renders teams and allows team selection', async () => {
    const studentData = { firstName: 'John', lastName: 'Doe' };
    const teamsData = [
      { _id: 'team1', name: 'Team Alpha', students: [{ firstName: 'Jane', lastName: 'Doe' }] },
      { _id: 'team2', name: 'Team Beta', students: [{ firstName: 'Mike', lastName: 'Smith' }] },
    ];
    axios.get.mockResolvedValueOnce({ data: studentData }); // Fetch student data
    axios.get.mockResolvedValueOnce({ data: teamsData }); // Fetch teams data

    render(
      <Router>
        <StudentDashboard />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Team Alpha/i)).toBeInTheDocument();
      expect(screen.getByText(/Team Beta/i)).toBeInTheDocument();
    });

    // Simulate clicking the "Evaluate Team" button for Team Alpha
    const evaluateButton = screen.getByText(/Evaluate Team/i);
    fireEvent.click(evaluateButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/Team_Evaluation/team1', {
        state: { team: teamsData[0], student: studentData },
      });
    });
  });

*/