import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cooperation from '../Cooperation';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

describe('Cooperation Component', () => {
    const mockNavigate = jest.fn();
    const mockUseLocation = jest.fn(() => ({
        state: {
            selectedTeammates: [
                { _id: '1', firstName: 'John', lastName: 'Doe' },
                { _id: '2', firstName: 'Jane', lastName: 'Smith' },
            ],
            teamName: 'Team Alpha',
            teamId: 'team123',
            updatedTeammates: null,
        },
    }));

    beforeEach(() => {
        jest.mocked(require('react-router-dom').useNavigate).mockReturnValue(mockNavigate);
        jest.mocked(require('react-router-dom').useLocation).mockImplementation(mockUseLocation);
        jest.clearAllMocks();
    });

    test('navigates to PeerRating on "Rate" button click', () => {
        render(
            <MemoryRouter>
                <Cooperation />
            </MemoryRouter>
        );

        // Find the list item for "John Doe" and click the "Rate" button
        const johnDoeItem = screen.getByText('John Doe').closest('li');
        const rateButton = within(johnDoeItem).getByText('Rate');
        fireEvent.click(rateButton);

        expect(mockNavigate).toHaveBeenCalledWith(`/PeerRating/team123/1`, {
            state: expect.objectContaining({
                teammate: { _id: '1', firstName: 'John', lastName: 'Doe' },
            }),
        });
    });

    test('renders submission confirmation if no teammates left', () => {
        mockUseLocation.mockReturnValueOnce({
            state: {
                selectedTeammates: [],
                teamName: 'Team Alpha',
                teamId: 'team123',
                updatedTeammates: [],
            },
        });

        render(
            <MemoryRouter>
                <Cooperation />
            </MemoryRouter>
        );

        expect(screen.getByText('Submission Confirmed!')).toBeInTheDocument();
        expect(screen.getByText('All teammates have been rated. Thank you for your submission!')).toBeInTheDocument();
    });

    test('navigates back to Student Dashboard on "Back to Dashboard" button click', () => {
        render(
            <MemoryRouter>
                <Cooperation />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Back to Dashboard'));
        expect(mockNavigate).toHaveBeenCalledWith('/Student_Dashboard');
    });
});

