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
    render(<Router><Signup /></Router>);
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Role:')).toBeInTheDocument();
    expect(screen.getByTestId('cubnit')).toBeInTheDocument();
  });
  it('Creates new account',async () => {
    axios.post.mockResolvedValue({status: 200, data: { message: 'Sign up successful!' },  });
    render(<Router><Signup /></Router>);
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'smith@john.ca' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123456789' } });
    const hu = screen.getByTestId("cubnit");
    fireEvent.click(hu);
     await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/Signup', {
                firstName: 'John',
                lastName: 'Smith',
                email: 'smith@john.ca',
                password: '123456789',
                role: 'student',
            });
        });
  });
  it('Testing existing account redirect',() => {
    render(<Router><Signup /></Router>);
    const hu = screen.getByTestId("existing");
    fireEvent.click(hu);
    expect(mockedNavigate).toHaveBeenLastCalledWith('/login');
  });

});
