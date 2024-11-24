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
  it('Team creation button',() => {
    render(<Router><Teacher_Dashboard /></Router>);
    const hu = screen.getByTestId("existing");
    fireEvent.click(hu);
    expect(mockedNavigate).toHaveBeenLastCalledWith('/login');
  });
  
  it('Testing existing acco',() => {
    render(<Router><Teacher_Dashboard /></Router>);
    const hu = screen.getByTestId("existing");
    fireEvent.click(hu);
    expect(mockedNavigate).toHaveBeenLastCalledWith('/login');
  });

});
describe('team creation', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders teacher dashboard page', async () => {
      render(<Router><Teacher_Dashboard /></Router>); //renders the teacher dashboard
  
     
      //expect(screen.get
    });
    it('Team creation button',() => {
      render(<Router><Teacher_Dashboard /></Router>);
      const hu = screen.getByTestId("existing");
      fireEvent.click(hu);
      expect(mockedNavigate).toHaveBeenLastCalledWith('/login');
    });
    
    it('Testing existing acco',() => {
      render(<Router><Teacher_Dashboard /></Router>);
      const hu = screen.getByTestId("existing");
      fireEvent.click(hu);
      expect(mockedNavigate).toHaveBeenLastCalledWith('/login');
    });
  
  });
