import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import RoomList from '../RoomList'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

jest.mock('axios');
// Mock the navigate function from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('room list unit test',() => {
    beforeEach(() => {
        //mockNavigate = jest.fn();
        //useNavigate.mockReturnValue(mockNavigate);
      });
      afterEach(() => {
        jest.clearAllMocks();

      });
it('renders loading state initially', async () =>  {
    render(<Router><RoomList/></Router>);  
    expect(screen.getByText(/Loading rooms.../i)).toBeInTheDocument();
});
it('tests successfull API calls', async () =>  {
const mockRooms = [
    { _id: '1', roomName: 'Room A', capacity: 10 },
    { _id: '2', roomName: 'Room B', capacity: 20 },
];
axios.get.mockResolvedValue({ data: mockRooms });

render(<Router><RoomList/></Router>); 
// Wait for the API call to resolve
await waitFor(() => expect(screen.getByText('Room A')).toBeInTheDocument());//fix with data-testid

expect(screen.getByText('Room A')).toBeInTheDocument();//fix
expect(screen.getByText('Room B')).toBeInTheDocument();//fix this with data-testid
});
it('tests return button', async () =>  {
  const mockRooms = [
    { _id: '1', roomName: 'Room A', capacity: 10 },
    { _id: '2', roomName: 'Room B', capacity: 20 },
  ];
  axios.get.mockResolvedValue({ data: mockRooms });
  render(<Router><RoomList/></Router>); 
  await waitFor(() => expect(screen.getByText('Room A')).toBeInTheDocument());//fix with data-testid
  fireEvent.click(screen.getByText('Go back to Student Dashboard page'));
  expect(mockedNavigate).toHaveBeenCalledWith('/Student_Dashboard');
});
});