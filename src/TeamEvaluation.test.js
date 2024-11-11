// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import TeamEvaluation from './Team_Evaluation'; // Adjust the import based on your file structure
// import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';

// // Mocking the navigate and location functions from react-router-dom
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'), // Keep the real imports of react-router-dom
//   useLocation: jest.fn(),
//   useNavigate: jest.fn(),
// }));

// describe('TeamEvaluation Component', () => {
//   const mockNavigate = jest.fn();
//   const mockLocation = {
//     state: {
//       team: {
//         _id: 'team-id',
//         name: 'Team Alpha',
//         students: [
//           { _id: 'student1', firstName: 'John', lastName: 'Doe' },
//           { _id: 'student2', firstName: 'Jane', lastName: 'Doe' },
//         ],
//       },
//       student: { _id: 'student1', firstName: 'John', lastName: 'Doe' },
//     },
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//     // Mock the navigate function
//     useNavigate.mockReturnValue(mockNavigate);
//     // Mock the useLocation hook to simulate the provided state
//     useLocation.mockReturnValue(mockLocation);
//   });

//   it('renders the form and displays team name', () => {
//     render(
//       <Router>
//         <TeamEvaluation />
//       </Router>
//     );

//     expect(screen.getByText('Evaluate Team: Team Alpha')).toBeInTheDocument();
//     expect(screen.getByText(/Select teammates to evaluate:/i)).toBeInTheDocument();
//     expect(screen.getByText('Select evaluation type:')).toBeInTheDocument();
//   });

//   it('should allow selecting teammates and evaluation type', () => {
//     render(
//       <Router>
//         <TeamEvaluation />
//       </Router>
//     );

//     // Select teammates
//     const teammateCheckbox = screen.getByLabelText(/Jane Doe/i);
//     fireEvent.click(teammateCheckbox);

//     // Select evaluation type
//     const select = screen.getByRole('combobox');
//     fireEvent.change(select, { target: { value: 'Type1' } });

//     // Check that the checkbox and select input are updated correctly
//     expect(teammateCheckbox).toBeChecked();
//     expect(select.value).toBe('Type1');
//   });

//   it('should show alert if no teammates are selected and evaluation type is not chosen', async () => {
//     render(
//       <Router>
//         <TeamEvaluation />
//       </Router>
//     );

//     const submitButton = screen.getByRole('button', { name: /Rate/i });

//     // Mock window.alert to check if it's called
//     window.alert = jest.fn();

//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(window.alert).toHaveBeenCalledWith(
//         'Please select at least one teammate and an evaluation type.'
//       );
//     });
//   });

//   it('should navigate to the correct page when form is submitted with valid data', async () => {
//     render(
//       <Router>
//         <TeamEvaluation />
//       </Router>
//     );

//     // Select teammates
//     const teammateCheckbox = screen.getByLabelText(/Jane Doe/i);
//     fireEvent.click(teammateCheckbox);

//     // Select evaluation type
//     const select = screen.getByRole('combobox');
//     fireEvent.change(select, { target: { value: 'Type1' } });

//     // Submit the form
//     const submitButton = screen.getByRole('button', { name: /Rate/i });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(mockNavigate).toHaveBeenCalledWith('/Cooperation', {
//         state: {
//           selectedTeammates: [{ _id: 'student2', firstName: 'Jane', lastName: 'Doe' }],
//           teamName: 'Team Alpha',
//           teamId: 'team-id',
//           evaluationType: 'Type1',
//         },
//       });
//     });
//   });
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TeamEvaluation from './Team_Evaluation'; // Adjust the import based on your file structure
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';

// Mocking the navigate and location functions from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Keep the real imports of react-router-dom
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('TeamEvaluation Component', () => {
  const mockNavigate = jest.fn();
  const mockLocation = {
    state: {
      team: {
        _id: 'team-id',
        name: 'Team Alpha',
        students: [
          { _id: 'student1', firstName: 'John', lastName: 'Doe' },
          { _id: 'student2', firstName: 'Jane', lastName: 'Doe' },
        ],
      },
      student: { _id: 'student1', firstName: 'John', lastName: 'Doe' },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the navigate function
    useNavigate.mockReturnValue(mockNavigate);
    // Mock the useLocation hook to simulate the provided state
    useLocation.mockReturnValue(mockLocation);
  });

  it('renders the form and displays team name', () => {
    render(
      <Router>
        <TeamEvaluation />
      </Router>
    );

    expect(screen.getByText('Evaluate Team: Team Alpha')).toBeInTheDocument();
    expect(screen.getByText(/Select teammates to evaluate:/i)).toBeInTheDocument();
    expect(screen.getByText('Select evaluation type:')).toBeInTheDocument();
  });

  it('should allow selecting teammates and evaluation type', () => {
    render(
      <Router>
        <TeamEvaluation />
      </Router>
    );

    // Select teammates
    const teammateCheckbox = screen.getByLabelText(/Jane Doe/i);
    fireEvent.click(teammateCheckbox);

    // Select evaluation type
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Type1' } });

    // Check that the checkbox and select input are updated correctly
    expect(teammateCheckbox).toBeChecked();
    expect(select.value).toBe('Type1');
  });

  it('should show alert if no teammates are selected and evaluation type is not chosen', async () => {
    render(
      <Router>
        <TeamEvaluation />
      </Router>
    );

    const submitButton = screen.getByRole('button', { name: /Rate/i });

    // Mock window.alert to check if it's called
    window.alert = jest.fn();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Please select at least one teammate and an evaluation type.'
      );
    });
  });

  it('should navigate to the correct page when form is submitted with valid data', async () => {
    render(
      <Router>
        <TeamEvaluation />
      </Router>
    );

    // Select teammates
    const teammateCheckbox = screen.getByLabelText(/Jane Doe/i);
    fireEvent.click(teammateCheckbox);

    // Select evaluation type
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Type1' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Rate/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/Cooperation', {
        state: {
          selectedTeammates: [{ _id: 'student2', firstName: 'Jane', lastName: 'Doe' }],
          teamName: 'Team Alpha',
          teamId: 'team-id',
          evaluationType: 'Type1',
        },
      });
    });
  });
});
