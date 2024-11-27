import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import DetailedResults from '../DetailedResults'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
// Mock the navigate function from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));


describe('Detailed results unit test',() => {
    beforeEach(() => {
      localStorage.setItem('token', 'mockToken');
      });
      afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
      });
      it('renders loading state initially', async () =>  {
        render(<Router><DetailedResults /></Router>);  
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
      });
      it('renders detailed view', async () =>  {
        axios.get.mockResolvedValueOnce({data: {teamName: 'Test Team',students: [{ name: 'Student 1',ratings: [{raterID: '1',raterName: 'Rater 1',score: { cooperation: 4, conceptualContribution: 3, practicalContribution: 5,workEthic: 4,},comment: 'Good work',},],},],},});
        await act( async () => render(<Router><DetailedResults /></Router>));  
        await waitFor(() => {
        expect(screen.getByText('Team: Test Team')).toBeInTheDocument();
        expect(screen.getByText('Student 1')).toBeInTheDocument();
        expect(screen.getByText('Rater 1')).toBeInTheDocument();
      });
    
    });
    it('goes to summery', async () =>{
        axios.get.mockResolvedValueOnce({data: {teamName: 'Test Team',students: [{ name: 'Student 1',ratings: [{raterID: '1',raterName: 'Rater 1',score: { cooperation: 4, conceptualContribution: 3, practicalContribution: 5,workEthic: 4,},comment: 'Good work',},],},],},});
        await act( async () => render(<Router><DetailedResults /></Router>));  
        const goBackLink = screen.getByTestId("mess"); 
        fireEvent.click(goBackLink);
        await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalled()
    });
  });
});