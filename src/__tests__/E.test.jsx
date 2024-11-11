import { render, screen } from '@testing-library/react'
import main from '../main';
import app from '../App';
import App from '../App';

test("Example 1 renders successfully", () => {
    render(<main.jsx/>);

    const element = screen.getByText(/Log In/i);

    expect(element).toBeInTheDocument();
})
