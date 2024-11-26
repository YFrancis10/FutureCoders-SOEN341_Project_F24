import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import BookRoom from '../BookRoom'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

jest.mock('axios');
const mockedNavigate = jest.fn();
// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}))
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockReturnValue({
        state: {
            teamMembers: [{ _id: '1', firstName: 'John', lastName: 'Doe' },{ _id: '2', firstName: 'John', lastName: 'Doe' }],
            roomName: 'Room 1',
            teamName: 'Team Alpha',
            roomCapacity: 1,
        },
    }),
    useNavigate: jest.fn(),
    useParams: jest.fn().mockReturnValue({ roomId: '123' }),
}));

describe('Book room unit test',() => {
    beforeEach(() => {
        //mockNavigate = jest.fn();
        //useNavigate.mockReturnValue(mockNavigate);
      });
      afterEach(() => {
        jest.clearAllMocks();

      });
it('renders loading state initially', async () =>  {
    await act( async () => render(<Router><BookRoom /></Router>));  
    expect(screen.getByText(/Book Room 1 for Team Team Alpha/i)).toBeInTheDocument();
  });
it('exceeds maximum room size', async () =>  {
    window.alert = jest.fn();
   // jest.spyOn(window, 'alert').mockImplementation(() => {});
    await act( async () => render(<Router><BookRoom /></Router>));
    const checkboxes = screen.getAllByRole('checkbox');
    const submitButton = screen.getByTestId("cubnit"); //replace with getbyTestID 
    expect(checkboxes).toHaveLength(2); // Should match the mock data
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    fireEvent.click(submitButton);
    await waitFor(() => {
        expect(window.alert).toBeCalled();
    });
 });
 it('testing API calls', async () =>  {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(
        <Router>
            <BookRoom />
        </Router>
    );

    fireEvent.change(screen.getByTestId("meat"), { target: { value: 'Weekly Meeting' } });
    fireEvent.change(screen.getByTestId("cal"), { target: { value: '2024-11-27' } });
    fireEvent.change(screen.getByTestId("debut"), { target: { value: '09:00' } });
    fireEvent.change(screen.getByTestId("fin"), { target: { value: '10:00' } });

    const submitButton = screen.getByTestId("cubnit");
    fireEvent.click(submitButton);

    await screen.findByText(/Room booked successfully!/i); // Wait for success message, this and the other are alert issues
    expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/book-room',
        expect.objectContaining({
            roomId: '123',
            date: '2024-11-27',
            startTime: '09:00',
            endTime: '10:00',
            meetingName: 'Weekly Meeting',
            attendees: [],
        }),
        expect.any(Object) // Check headers
    );
}); 
});
