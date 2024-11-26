import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import DetailedResults from '../DetailedResults'; // Adjust the import based on your file structure
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
        await act( async () => render(<Router><DetailedResults /></Router>));  
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
      });
      it('renders detailed view', async () =>  {
      const mockStudent1 = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student', studentID: '12345' };
      const mockStudent2 = { firstName: 'Jon', lastName: 'Dow', email: 'jon@example.com', role: 'Student', studentID: '56789' };
      const mockTeam ={teamId:"123",students:[mockStudent1,mockStudent2]};
      axios.get.mockResolvedValueOnce({ data: mockTeam }); // Mock axios response
      await act( async () => render(<Router><DetailedResults /></Router>));  
    });
    it('returns to dashboard', async () =>{
        //const createTeamButton = screen.getBy('mess'); fix this line
        fireEvent.click(createTeamButton);
        expect(mockNavigate).toHaveBeenCalled();//
    });
});