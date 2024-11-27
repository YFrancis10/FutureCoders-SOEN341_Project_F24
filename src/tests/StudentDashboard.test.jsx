import React from 'react';
import { render, screen, waitFor,act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import StudentDashboard from '../Student_Dashboard';

jest.mock('axios');

describe('StudentDashboard', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mockToken');
    });
    afterEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
    });
  it('renders student data correctly', async () => {
    // Mocked student data response
    const mockStudent =[ { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student', studentID: '12345' }];
    axios.get.mockResolvedValueOnce({ data: mockStudent }); // Mock axios response

    await act( async () => render(<MemoryRouter><StudentDashboard /></MemoryRouter>));

    await waitFor(() => {
      expect(screen.getByText("Welcome,")).toBeInTheDocument();
      expect(screen.getByText(" Email:")).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock error in axios response
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    await act( async () => render(<MemoryRouter><StudentDashboard /></MemoryRouter>));

    const errorMessage = await screen.findByText('Failed to load student data. Please try again later');
    expect(errorMessage).toBeInTheDocument();
  });
});
