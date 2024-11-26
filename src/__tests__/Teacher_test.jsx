//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
the issue is with the axios.get calls. I have no clue what I'm doing wrong with the formatting of the teacher, team or student objects or if there is a timing error
the error in question:

          Error fetching teacher data: TypeError: Cannot read properties of undefined (reading 'data')
          at data (C:\Users\benap\FutureCoders-SOEN341_Project_F24\src\Teacher_Dashboard.jsx:26:37)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
Attempted changes to Teacher data:
          ->Defining team as empty array
          ->Removed team definition completely
          ->defined team seperately and then defined the mock teacher after with the mock team included
          -> added data: into the definition

          -> replaced current function with: 
             axios.get.mockImplementation((url) => {
              if (url === 'http://localhost:5001/teacher/me') {
                return Promise.resolve({ data: mockTeacherData });
              }
              if (url === 'http://localhost:5001/teacher/teams') {
                  return Promise.resolve({ data: mockTeamsData });
               }
});

*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Teacher_Dashboard from '../Teacher_Dashboard';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('TeacherDashboard Component', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    localStorage.setItem('token', 'mockToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders loading state initially', () => {
    render(
      <Router>
        <Teacher_Dashboard />
      </Router>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('fetches and displays teacher and team data', async () => {
    const mockTeamsData = {
      data: [
        {
          id: '1',
          name: 'test',
          students: [
            { _id: '1', firstName: 'Alice', lastName: 'Smith' },
            { _id: '2', firstName: 'Bob', lastName: 'Brown' },
          ],
        },
      ],
    }
    const mockTeacherData = {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'Teacher',
        team:[mockTeamsData]
      },
    };

    axios.get
      .mockResolvedValueOnce({ data: mockTeacherData }) // First API call for teacher data
      .mockResolvedValueOnce({ data: mockTeamsData }); // Second API call for teams data

    render(
      <Router>
        <Teacher_Dashboard />
      </Router>
    );

    // Wait for the API call to finish and the DOM to update
    await waitFor(() => {
      expect(screen.getByText(/welcome, John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/email: john.doe@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/test/i)).toBeInTheDocument();
      expect(screen.getByText(/alice smith/i)).toBeInTheDocument();
      expect(screen.getByText(/bob brown/i)).toBeInTheDocument();
    });
  });

  it('navigates to the team creation page on button click', async () => {
    render(
      <Router>
        <Teacher_Dashboard />
      </Router>
    );

    const createTeamButton = screen.getByTestId('mess');
    fireEvent.click(createTeamButton);

    expect(mockNavigate).toHaveBeenCalledWith('/Teams');
  });

  it('handles delete team functionality', async () => {
    const mockTeacherData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'Teacher',
    };
    const mockTeamsData = [
      {
        id: '1',
        name: 'test',
        students: [],
      },
    ];

    axios.get
      .mockResolvedValueOnce({ data: mockTeacherData }) // First API call for teacher data
      .mockResolvedValueOnce({ data: mockTeamsData }); // Second API call for teams data

    axios.delete.mockResolvedValueOnce({});

    render(
      <Router>
        <Teacher_Dashboard />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/test/i)).toBeInTheDocument();
    });

    const deleteButton = screen.getByText(/delete team/i);
    window.confirm = jest.fn().mockReturnValue(true); // Mock confirmation dialog

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:5001/teams/1',
        expect.anything()
      );
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    });
  });
});