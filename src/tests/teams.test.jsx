import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import Teams from '../Teams'; // Adjust the import based on your file structure
import axios from 'axios';
import { BrowserRouter as Router} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Team', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        axios.get.mockReset();
        axios.post.mockReset();
      });
      it('renders team data', async () =>  {
        axios.get.mockResolvedValueOnce({data: [{ _id: '1', firstName: 'John', lastName: 'Doe' },{ _id: '2', firstName: 'Jane', lastName: 'Smith' },],});
        await act( async () => render(<Router><Teams /></Router>)); 
        expect(screen.getByLabelText(/team name/i)).toBeInTheDocument();
        await waitFor(() => expect(screen.getByLabelText('John Doe')).toBeInTheDocument());
      });
      it('Selects students', async () =>  {
        axios.get.mockResolvedValueOnce({data: [{ _id: '1', firstName: 'John', lastName: 'Doe' },{ _id: '2', firstName: 'Jane', lastName: 'Smith' },],});
        await act( async () => render(<Router><Teams /></Router>)); 
        const johnCheckbox = screen.getByLabelText('John Doe');
        const janeCheckbox = screen.getByLabelText('Jane Smith');
        expect(johnCheckbox).not.toBeChecked();
        expect(janeCheckbox).not.toBeChecked();
        fireEvent.click(johnCheckbox);
        fireEvent.click(janeCheckbox)
        expect(johnCheckbox).toBeChecked();
        expect(janeCheckbox).toBeChecked();
    });
    it('Team uploads to server successfully', async () =>  {
        axios.get.mockResolvedValueOnce({data: [{ _id: '1', firstName: 'John', lastName: 'Doe' },{ _id: '2', firstName: 'Jane', lastName: 'Smith' },],});
        axios.post.mockResolvedValueOnce({ data: { message: 'Team created successfully' } });
        await act( async () => render(<Router><Teams /></Router>)); 
        await waitFor(() => expect(screen.getByLabelText('John Doe')).toBeInTheDocument());
        const johnCheckbox = screen.getByLabelText('John Doe');
        const janeCheckbox = screen.getByLabelText('Jane Smith');
        fireEvent.click(johnCheckbox);
        fireEvent.click(janeCheckbox);
        fireEvent.change(screen.getByLabelText(/team name/i), { target: { value: 'Team A' } });
        const submitButton = screen.getByText(/create team/i);
        fireEvent.click(submitButton);
        await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:5001/teams',
            { name: 'Team A', students: ['1', '2'] },
            expect.any(Object)
          ));
    });
    it('Back button works', async () =>  {
        axios.get.mockResolvedValueOnce({data: [{ _id: '1', firstName: 'John', lastName: 'Doe' },{ _id: '2', firstName: 'Jane', lastName: 'Smith' },],});
        axios.post.mockResolvedValueOnce({ data: { message: 'Team created successfully' } });
        await act( async () => render(<Router><Teams /></Router>)); 
        await waitFor(() => expect(screen.getByLabelText('John Doe')).toBeInTheDocument());;
        const goBackButton = screen.getByText(/go back/i);
        fireEvent.click(goBackButton);
        expect(mockedNavigate).toHaveBeenCalledWith('/Teacher_Dashboard');
  });

});