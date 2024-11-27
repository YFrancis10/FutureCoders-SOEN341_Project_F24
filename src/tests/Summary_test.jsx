import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import Summary from '../Summary'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));


describe('Detailed results unit test',() => {
  beforeEach(() => {
    localStorage.setItem('token', 'mockToken'); // Mock token in localStorage
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('renders loading state initially', async () =>  {
        axios.get.mockImplementation(() => new Promise(() => {}));
        render(<Router><Summary /></Router>);  
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
      it('renders team data', async () =>  {
      const mockteam=[{studentID: '1',lastName: 'Doe',firstName: 'John', cooperation: 4.5,conceptualContribution: 4.0,practicalContribution: 5.0, workEthic: 4.8,average: 4.6,peersWhoResponded: 5,},];
      axios.get.mockResolvedValueOnce({data:mockteam}).mockResolvedValueOnce({data: { teamName: 'Mock Team' }});
      await act( async () => render(<Router><Summary /></Router>)); 
      expect(screen.getByText(/Team: Mock Team/i)).toBeInTheDocument();
      expect(screen.getByText(/John/i)).toBeInTheDocument();
      expect(screen.getByText(/Doe/i)).toBeInTheDocument();
    });
    it('Failed API call', async () =>{
    axios.get.mockRejectedValue(new Error('Failed to fetch data'));
    await act( async () => render(<Router><Summary /></Router>)); 
    expect(screen.getByText(/Failed to load team data/i)).toBeInTheDocument();
    });
   /* it('returns to dashboard', async () =>{
      
      const mockteam=[{studentID: '1',lastName: 'Doe',firstName: 'John', cooperation: 4.5,conceptualContribution: 4.0,practicalContribution: 5.0, workEthic: 4.8,average: 4.6,peersWhoResponded: 5,},];
      axios.get.mockResolvedValueOnce({data:mockteam}).mockResolvedValueOnce({data: { teamName: 'Mock Team' }});
      await act( async () => render(<Router><Summary /></Router>)); 
      const backButton = await screen.findByTestId('retour');
      expect(backButton).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("retour"));
      expect(mockNavigate).toHaveBeenCalled('/Teacher_Dashboard');
    });*/
});