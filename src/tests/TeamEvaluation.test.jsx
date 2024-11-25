import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TeamEvaluation from '../Team_Evaluation';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

describe('TeamEvaluation Component', () => {
    const mockNavigate = jest.fn();
    const mockUseLocation = {
        state: {
            team: {
                _id: 'team1',
                name: 'Team Alpha',
                students: [
                    { _id: 'student1', firstName: 'Alice', lastName: 'Johnson' },
                    { _id: 'student2', firstName: 'Bob', lastName: 'Smith' },
                ],
            },
            student: { _id: 'student1', firstName: 'Alice', lastName: 'Johnson' },
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        require('react-router-dom').useLocation.mockReturnValue(mockUseLocation);
        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    });

    it('renders the team name', () => {
        render(
            <Router>
                <TeamEvaluation />
            </Router>
        );
        expect(screen.getByText(/Evaluate Team: Team Alpha/i)).toBeInTheDocument();
    });

    it('displays teammates except the logged-in student', () => {
        render(
            <Router>
                <TeamEvaluation />
            </Router>
        );
        expect(screen.getByText(/Bob Smith/i)).toBeInTheDocument();
        expect(screen.queryByText(/Alice Johnson/i)).not.toBeInTheDocument();
    });

    it('allows selecting and deselecting teammates', () => {
        render(
            <Router>
                <TeamEvaluation />
            </Router>
        );

        const checkbox = screen.getByLabelText(/Bob Smith/i);

        // Select teammate
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        // Deselect teammate
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('alerts when submitting without selecting teammates', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <Router>
                <TeamEvaluation />
            </Router>
        );

        const submitButton = screen.getByText(/Submit Evaluation/i);
        fireEvent.click(submitButton);

        expect(window.alert).toHaveBeenCalledWith('Please select at least one teammate.');
    });

    it('navigates back to the dashboard', () => {
        render(
            <Router>
                <TeamEvaluation />
            </Router>
        );

        const goBackButton = screen.getByText(/Go back/i);
        fireEvent.click(goBackButton);

        expect(mockNavigate).toHaveBeenCalledWith('/Student_Dashboard');
    });

    it('submits selected teammates and navigates to the cooperation page', () => {
        render(
            <Router>
                <TeamEvaluation />
            </Router>
        );

        const checkbox = screen.getByLabelText(/Bob Smith/i);
        const submitButton = screen.getByText(/Submit Evaluation/i);

        // Select teammate
        fireEvent.click(checkbox);

        // Submit form
        fireEvent.click(submitButton);

        expect(mockNavigate).toHaveBeenCalledWith('/Cooperation', {
            state: {
                selectedTeammates: [{ _id: 'student2', firstName: 'Bob', lastName: 'Smith' }],
                teamName: 'Team Alpha',
                teamId: 'team1',
            },
        });
    });
});
