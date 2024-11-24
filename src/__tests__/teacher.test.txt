import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Teacher_Dashboard from '../Teacher_Dashboard'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('axios');

// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Log-in Page', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    render(
      <Router>
        <Teacher_Dashboard />
      </Router>
    );

    expect(screen.getByText(/Error fetching teacher data/i)).toBeInTheDocument();
    
    //expect(screen.get
  });
});