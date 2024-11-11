import { render, screen } from '@testing-library/react';
import main from '../main';
import App from '../App';

test("Example 1 renders successfully", () => {
    render(<App/>);

    const element = screen.getByText(/Log In/i);

    expect(element).toBeInTheDocument();
})
