import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import Email from '../Email'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


jest.mock('axios');
const mockedNavigate = jest.fn();
// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe('Detailed results unit test',() => {
    beforeEach(() => {
        //mockNavigate = jest.fn();
        //useNavigate.mockReturnValue(mockNavigate);
      });
      afterEach(() => {
        jest.clearAllMocks();

      });
      it('renders loading state initially', async () =>  {
        await act( async () => render(<Router><Email/></Router>));  
        expect(screen.getByText(/Forgot your Password?/i)).toBeInTheDocument();
      });
      it("redirects to log-on", async () =>  {
        await act( async () => render(<Router><Email /></Router>));  
        const hu = screen.getByTestId("log");
        fireEvent.click(hu);
        expect(mockedNavigate).toHaveBeenLastCalledWith('/Login');
      });
      it("redirects to sign-up", async () =>  {
        await act( async () => render(<Router><Email /></Router>));  
        const hu = screen.getByTestId("sign");
        fireEvent.click(hu);
        expect(mockedNavigate).toHaveBeenLastCalledWith('/Signup');
      });
      it("Successfull reset", async () =>  {
        axios.post.mockResolvedValueOnce({
          status: 200, data: { success: true, message: 'Email found' }});
        //axios.post.mockResolvedValueOnce({success:200,data:mocksuc});
        await act( async () => render(<Router><Email /></Router>));
        fireEvent.change(screen.getByPlaceholderText('example@example.com'), {target: { value: 'test@example.com' }, });
        const hu = screen.getByTestId("steve");
        fireEvent.click(hu);  
        await waitFor(() =>
          expect(mockedNavigate).toHaveBeenLastCalledWith('/password-change', {
            state: { email: 'test@example.com' },
          })
        );
      });
      it(" email not found", async () =>  {
        axios.post.mockResolvedValueOnce({
          status: 200, data: { success: true, message: 'Email found' }});
        //axios.post.mockResolvedValueOnce({success:200,data:mocksuc});
        await act( async () => render(<Router><Email /></Router>));
        fireEvent.change(screen.getByPlaceholderText('example@example.com'), {target: { value: 'test@example.com' }, });
        const hu = screen.getByTestId("steve");
        fireEvent.click(hu);  
        await waitFor(() =>
          expect(mockedNavigate).toHaveBeenLastCalledWith('/password-change', {
            state: { email: 'test@example.com' },
          })
        );
      });
});