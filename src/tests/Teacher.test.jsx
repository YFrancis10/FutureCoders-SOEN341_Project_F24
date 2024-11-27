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
import { render, cleanup,screen, fireEvent, waitFor,act } from '@testing-library/react';
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
    axios.get.mockReset();
    axios.delete.mockReset();
    axios.post.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders loading state initially', async() => {
    await act( async () => render(<Router><Teacher_Dashboard /></Router>)); 

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('fetches and displays teacher and team data', async () => {
    axios.get.mockResolvedValueOnce({data: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Teacher' },});
    axios.get.mockResolvedValueOnce({
      data: [
        { id: '1', name: 'Team A', students: [{ _id: '1', firstName: 'Alice', lastName: 'Johnson' }] },
        { id: '2', name: 'Team B', students: [{ _id: '2', firstName: 'Bob', lastName: 'Smith' }] },
      ],
    });
    await act( async () => render(<Router><Teacher_Dashboard /></Router>)); 
    await waitFor(() => screen.getByText('Welcome, John Doe'));
   // expect(screen.getByText('Your Teams:')).toBeInTheDocument();
    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
  });

  it('navigates to the team creation page on button click', async () => {
    axios.get.mockResolvedValueOnce({data: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Teacher' },});
    axios.get.mockResolvedValueOnce({data: [{ id: '1', name: 'Team A', students: [{ _id: '1', firstName: 'Alice', lastName: 'Johnson' }] },{ id: '2', name: 'Team B', students: [{ _id: '2', firstName: 'Bob', lastName: 'Smith' }] },],});
    await act( async () => render(<Router><Teacher_Dashboard /></Router>)); 
    const createTeamButton = screen.getByTestId('mess');
    fireEvent.click(createTeamButton);

    expect(mockNavigate).toHaveBeenCalledWith('/Teams');
  });

  it('handles delete team functionality', async () => {
    axios.get.mockResolvedValueOnce({data: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Teacher' },});
    axios.get.mockResolvedValueOnce({data: [{ id: '1', name: 'Team A', students: [{ _id: '1', firstName: 'Alice', lastName: 'Johnson' }] },],});
    axios.delete.mockResolvedValueOnce({data:{}});
    await act( async () => render(<Router><Teacher_Dashboard /></Router>)); 
    screen.debug()
    await waitFor(() => screen.getByText('Team A'));
    const deleteButton = screen.getByTestId("suppr");
    window.confirm = jest.fn().mockReturnValue(true); // Mock confirmation dialog

    fireEvent.click(deleteButton);
    //window.confirm = jest.fn().mockReturnValue(true);
    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith('http://localhost:5001/teams/1', expect.any(Object)));
    expect(screen.queryByText('Team A')).not.toBeInTheDocument();
  });
  
});
