import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import PeerRating from '../PeerRating';

// Mocking axios
jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ teamId: '123', studentId: '456' }),
    useNavigate: () => mockNavigate,
    useLocation: () => ({
        state: {
            teammate: { firstName: 'John', lastName: 'Doe' },
            remainingTeammates: [{ _id: '789', firstName: 'Jane', lastName: 'Smith' }],
            teamName: 'Team Alpha',
        },
    }),
}));

describe('PeerRating Component', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'test-token');
    });

    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('renders the PeerRating form with correct fields and labels', () => {
        render(
            <MemoryRouter>
                <PeerRating />
            </MemoryRouter>
        );

        expect(screen.getByText(/Rate John Doe/i)).toBeInTheDocument();
        expect(screen.getByTestId("cop")).toBeInTheDocument();
        expect(screen.getByTestId("prac")).toBeInTheDocument();
        expect(screen.getByTestId("weth")).toBeInTheDocument();
        expect(screen.getByTestId("comm")).toBeInTheDocument();
    });

    test('displays an error if ratings are not selected', async () => {
        render(<MemoryRouter><PeerRating /> </MemoryRouter>);

        const submitButton = screen.getByText(/Submit Rating/i);
        fireEvent.click(submitButton);

        expect(
            await screen.findByText(/Please select a valid rating for all dimensions/i)
        ).toBeInTheDocument();
    });

    test('submits the rating successfully', async () => {
        axios.post.mockResolvedValue({});

        render(
            <MemoryRouter>
                <PeerRating />
            </MemoryRouter>
        );

        // Fill the formprac
        fireEvent.change(screen.getByTestId("cop"), { target: { value: '5' } });
        fireEvent.change(screen.getByTestId("con"), { target: { value: '4' } });
        fireEvent.change(screen.getByTestId("prac"), { target: { value: '3' } });
        fireEvent.change(screen.getByTestId("weth"), { target: { value: '5' } });
        fireEvent.change(screen.getByTestId("comm"), { target: { value: 'Great teammate!' } });

        const submitButton = screen.getByText(/Submit Rating/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:5001/teams/123/ratings',
                {
                    rateeId: '456',
                    cooperation: '5',
                    conceptualContribution: '4',
                    practicalContribution: '3',
                    workEthic: '5',
                    comment: 'Great teammate!',
                },
                { headers: { Authorization: 'Bearer test-token' } }
            );
        });

        expect(mockNavigate).toHaveBeenCalledWith('/cooperation', expect.anything());
    });

    test('handles API error gracefully', async () => {
        axios.post.mockRejectedValue(new Error('Failed to submit'));

        render(
            <MemoryRouter>
                <PeerRating />
            </MemoryRouter>
        );

        // Fill the form
        fireEvent.change(screen.getByTestId("cop"), { target: { value: '5' } });
        fireEvent.change(screen.getByTestId("con"), { target: { value: '4' } });
        fireEvent.change(screen.getByTestId("prac"), { target: { value: '3' } });
        fireEvent.change(screen.getByTestId("weth"), { target: { value: '5' } });
        fireEvent.change(screen.getByTestId("comm"), { target: { value: 'Great teammate!' } });

        const submitButton = screen.getByText(/Submit Rating/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Failed to submit rating. Please try again./i)).toBeInTheDocument();
        });
    });

});
