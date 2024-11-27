import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import Login from '../Login'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));
describe('Log-in Page', () => {
  

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders inital state',async ()  => {
    await act( async () => render(<Router><Login /></Router>));  

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });
  it("Successfull student login", async () => {

    axios.post.mockResolvedValue({status: 200,data: { token: 'fakeToken', role: 'student' },});
    await act( async () => render(<Router><Login /></Router>));  
    const huh = screen.getByTestId("soumettre");
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'student@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.submit(huh);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/Login', {
          email: 'student@example.com',
          password: 'password123',
      });
  });
  expect(localStorage.getItem('token')).toBe('fakeToken');
  expect(mockedNavigate).toHaveBeenCalledWith('/Student_Dashboard');  

  });
  it("Successfull teacher login", async () => {

    axios.post.mockResolvedValue({status: 200,data: { token: 'fakeToken', role: 'teacher' },});
    await act( async () => render(<Router><Login /></Router>));  
   
    //const rangeinput=screen.getByLabelText('Email');
   // const rangeinput=screen.getAllByTestId("couriel");
    //const rangeinput2=screen.getByTestId("pass");
    const huh = screen.getByTestId("soumettre");
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'teacher@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.submit(huh);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/Login', {
          email: 'teacher@example.com',
          password: 'password123',
      });
  });
  expect(localStorage.getItem('token')).toBe('fakeToken');
  expect(mockedNavigate).toHaveBeenCalledWith('/Teacher_Dashboard');  
  });

  it('Testing forgotten password',async () => {
    render(<Router><Login /></Router>);
    const huh = screen.getByTestId("courrier");
    fireEvent.click(huh);
expect(mockedNavigate).toHaveBeenLastCalledWith('/Email');
  }); 

  it('Testing sign-up redirection',async () => {
    render(<Router><Login /></Router>);
    const hu = screen.getByTestId("hello");
    fireEvent.click(hu);
    expect(mockedNavigate).toHaveBeenLastCalledWith('/Signup');
  }); 
  /*it('Bad log in', async () => {Don't have an account
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
