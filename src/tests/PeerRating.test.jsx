// // import React from 'react';
// // import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// // import { BrowserRouter as Router } from 'react-router-dom';
// // import PeerRating from './PeerRating';
// // import axios from 'axios';

// // jest.mock('axios');

// // jest.mock('react-router-dom', () => ({
// //     ...jest.requireActual('react-router-dom'),
// //     useParams: jest.fn(),
// //     useLocation: jest.fn(),
// //     useNavigate: jest.fn(),
// // }));

// // describe('PeerRating Component', () => {
// //     const mockNavigate = jest.fn();
// //     const mockUseLocation = jest.fn();
// //     const mockUseParams = jest.fn();

// //     beforeEach(() => {
// //         jest.clearAllMocks();

// //         mockUseLocation.mockReturnValue({
// //             state: {
// //                 teammate: { _id: '1', firstName: 'John', lastName: 'Doe' },
// //                 remainingTeammates: [
// //                     { _id: '1', firstName: 'John', lastName: 'Doe' },
// //                 ],
// //                 teamName: 'Team Alpha',
// //             },
// //         });
// //         mockUseParams.mockReturnValue({ teamId: '123', studentId: '1' });
// //         jest.mock('react-router-dom', () => ({
// //             useLocation: mockUseLocation,
// //             useParams: mockUseParams,
// //             useNavigate: () => mockNavigate,
// //         }));
// //     });

// //     it('should render the teammate name', () => {
// //         render(
// //             <Router>
// //                 <PeerRating />
// //             </Router>
// //         );

// //         expect(screen.getByText('Rate John Doe')).toBeInTheDocument();
// //     });

// //     it('should display error if no cooperation rating is provided', async () => {
// //         render(
// //             <Router>
// //                 <PeerRating />
// //             </Router>
// //         );

// //         fireEvent.click(screen.getByText('Submit Rating'));

// //         await waitFor(() =>
// //             expect(
// //                 screen.getByText(
// //                     'Please select a valid cooperation rating (1-5).'
// //                 )
// //             ).toBeInTheDocument()
// //         );
// //     });

// //     it('should display error if no comment is provided', async () => {
// //         render(
// //             <Router>
// //                 <PeerRating />
// //             </Router>
// //         );

// //         fireEvent.change(screen.getByLabelText('Cooperation Rating'), {
// //             target: { value: '5' },
// //         });
// //         fireEvent.click(screen.getByText('Submit Rating'));

// //         await waitFor(() =>
// //             expect(
// //                 screen.getByText('Please enter a comment.')
// //             ).toBeInTheDocument()
// //         );
// //     });

// //     it('should submit the rating and navigate back to Cooperation page', async () => {
// //         axios.post.mockResolvedValueOnce({ data: 'Rating submitted' });

// //         render(
// //             <Router>
// //                 <PeerRating />
// //             </Router>
// //         );

// //         fireEvent.change(screen.getByLabelText('Cooperation Rating'), {
// //             target: { value: '5' },
// //         });
// //         fireEvent.change(screen.getByLabelText('Comment'), {
// //             target: { value: 'Great teammate!' },
// //         });

// //         fireEvent.click(screen.getByText('Submit Rating'));

// //         await waitFor(() => {
// //             expect(axios.post).toHaveBeenCalledWith(
// //                 'http://localhost:5001/teams/123/ratings',
// //                 { rateeId: '1', cooperation: '5', comment: 'Great teammate!' },
// //                 expect.objectContaining({
// //                     headers: { Authorization: 'Bearer undefined' },
// //                 })
// //             );
// //             expect(mockNavigate).toHaveBeenCalledWith(
// //                 '/cooperation',
// //                 expect.objectContaining({
// //                     state: expect.objectContaining({ updatedTeammates: [] }),
// //                 })
// //             );
// //         });
// //     });
// // });

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import PeerRating from '../PeerRating';

// describe('PeerRating', () => {
//   it('renders the peer rating form', () => {
//     render(
//       <MemoryRouter>
//         <PeerRating />
//       </MemoryRouter>
//     );

//     expect(screen.getByText(/Rate/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Cooperation/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Conceptual Contribution/i)).toBeInTheDocument();
//   });

//   it('shows an error for incomplete ratings', () => {
//     render(
//       <MemoryRouter>
//         <PeerRating />
//       </MemoryRouter>
//     );

//     const submitButton = screen.getByText(/Submit Rating/i);
//     submitButton.click();

//     expect(screen.getByText(/Please select a valid rating for all dimensions/i)).toBeInTheDocument();
//   });
// });

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
        expect(screen.getByLabelText(/Cooperation/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Conceptual Contribution/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Practical Contribution/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Work Ethic/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Comments/i)).toBeInTheDocument();
    });

    test('displays an error if ratings are not selected', async () => {
        render(
            <MemoryRouter>
                <PeerRating />
            </MemoryRouter>
        );

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

        // Fill the form
        fireEvent.change(screen.getByLabelText(/Cooperation/i), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText(/Conceptual Contribution/i), { target: { value: '4' } });
        fireEvent.change(screen.getByLabelText(/Practical Contribution/i), { target: { value: '3' } });
        fireEvent.change(screen.getByLabelText(/Work Ethic/i), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText(/Comments/i), { target: { value: 'Great teammate!' } });

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
        fireEvent.change(screen.getByLabelText(/Cooperation/i), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText(/Conceptual Contribution/i), { target: { value: '4' } });
        fireEvent.change(screen.getByLabelText(/Practical Contribution/i), { target: { value: '3' } });
        fireEvent.change(screen.getByLabelText(/Work Ethic/i), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText(/Comments/i), { target: { value: 'Great teammate!' } });

        const submitButton = screen.getByText(/Submit Rating/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Failed to submit rating. Please try again./i)).toBeInTheDocument();
        });
    });

    test('logs out the user and redirects to login', () => {
        render(
            <MemoryRouter>
                <PeerRating />
            </MemoryRouter>
        );

        const logoutButton = screen.getByText(/Log out/i);
        fireEvent.click(logoutButton);

        expect(localStorage.getItem('token')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});

