import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Teacher_Dashboard from '../Teacher_Dashboard'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('axios');
const mockedNavigate = jest.fn();
// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe('Teacher Sign-in', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders teacher dashboard page', async () => {
    render(<Router><Teacher_Dashboard /></Router>); //renders the teacher dashboard

   
    //expect(screen.get
  });
  it('Team creation button',async () => {
    render(<Router><Teacher_Dashboard /></Router>);
    axios.get.mock
    const hu = screen.getByTestId("create");
    fireEvent.click(hu);
    expect(mockedNavigate).toHaveBeenLastCalledWith('/Teams');
  });
  
 

});

