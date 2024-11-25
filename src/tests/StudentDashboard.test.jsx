import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import StudentDashboard from '../Student_Dashboard';

jest.mock('axios');

describe('StudentDashboard', () => {
  it('renders student data correctly', async () => {
    // Mocked student data response
    const mockStudent = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student', studentID: '12345' };
    axios.get.mockResolvedValueOnce({ data: mockStudent }); // Mock axios response

    render(
      <MemoryRouter>
        <StudentDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Email: john@example.com/i)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock error in axios response
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <MemoryRouter>
        <StudentDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load student data/i)).toBeInTheDocument();
    });
  });
});

