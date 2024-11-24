import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../Signup'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('axios');
const mockedNavigate = jest.fn();
// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe('Sign-in page', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading page', async () => {
   
    //expect(screen.get
  });
  it('Creates new account',() => {
    render(<Router><Signup /></Router>);
    const hu = screen.getByTestId("existing");
    fireEvent.click(hu);
    expect(mockedNavigate).toHaveBeenLastCalledWith('/login');
  });
  it('Testing existing account redirect',() => {
    render(<Router><Signup /></Router>);
    const hu = screen.getByTestId("existing");
    fireEvent.click(hu);
    expect(mockedNavigate).toHaveBeenLastCalledWith('/login');
  });

});
