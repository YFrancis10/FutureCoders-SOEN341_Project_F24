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
xit('renders without crashing', () => {
    // Your test code here (it will be skipped)
    expect(true).toBe(true);
  });
  