import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
const mockedNavigate = jest.fn();
// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('react', ()=>({
    ...jest.requireActual('react'),
    useState: jest.fn()
  }));
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
  }));
describe('Log-in Page', () => {
  const mockNavigate = jest.fn();
  

  beforeEach(() => {
    jest.clearAllMocks();
    useState.mockImplementation(jest.requireActual('react').useState);
  });

  it('renders loading state initially', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    //expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    //expect(screen.get
  });
  it("submits", async () => {
    const handleSubmit = jest.fn();
    render(<Router> <Login onSubmit={handleSubmit} /> </Router>);
    //const rangeinput=screen.getByLabelText('Email');
    const rangeinput=screen.getByTestId("boob");
    const rangeinput2=screen.getByTestId("pass");
    fireEvent.change(rangeinput,{target:{value: 'email'}});
    fireEvent.change(rangeinput2,{target:{value: 'password'}});
    
    const huh = screen.getByTestId("Butt");
    fireEvent.submit(huh);
    fireEvent.click(huh);

    //axios.post.mockImplementationOnce(()=>Promise.resolve({data:["hello"]}, {status:["400"]}));
    expect(screen.getByTestId("fuck")).toHaveTextContent('some text');
    //expect(screen.getByText(/Incorrect email or password/i)).toBeInTheDocument();
    useState.mockImplementationOnce(()=>[]);

  });
  it('hello',async () => {
    render(<Router><Login /></Router>);
    const huh = screen.getByTestId("ass");
    fireEvent.click(huh);
expect(mockedNavigate).toHaveBeenLastCalledWith('/Email');
  }); 
  /*it('Bad log in', async () => {
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
