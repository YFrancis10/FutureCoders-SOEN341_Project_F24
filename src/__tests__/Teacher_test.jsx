import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
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
      <BrowserRouter>
        <Teacher_Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('fetches and displays teacher and team data', async () => {
    const mockTeacherData = {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'Teacher',
      },
    };
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

    axios.get
      .mockResolvedValueOnce({ data: mockTeacherData }) // First API call for teacher data
      .mockResolvedValueOnce({ data: mockTeamsData }); // Second API call for teams data

    render(
      <BrowserRouter>
        <Teacher_Dashboard />
      </BrowserRouter>
    );

    // Wait for the API call to finish and the DOM to update
    await waitFor(() => {
      expect(screen.getByText(/welcome, John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/email: john.doe@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/team alpha/i)).toBeInTheDocument();
      expect(screen.getByText(/alice smith/i)).toBeInTheDocument();
      expect(screen.getByText(/bob brown/i)).toBeInTheDocument();
    });
  });

  it('navigates to the team creation page on button click', async () => {
    render(
      <BrowserRouter>
        <Teacher_Dashboard />
      </BrowserRouter>
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
        name: 'Team Alpha',
        students: [],
      },
    ];

    axios.get
      .mockResolvedValueOnce({ data: mockTeacherData }) // First API call for teacher data
      .mockResolvedValueOnce({ data: mockTeamsData }); // Second API call for teams data

    axios.delete.mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <Teacher_Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/team test/i)).toBeInTheDocument();
    });

    const deleteButton = screen.getByText(/delete team/i);
    window.confirm = jest.fn().mockReturnValue(true); // Mock confirmation dialog

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:5001/teams/1',
        expect.anything()
      );
      expect(screen.queryByText(/team team/i)).not.toBeInTheDocument();
    });
  });
});
