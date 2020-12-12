import { render, screen } from '@testing-library/react';
import App from './App';

test('renders video component to page', () => {
  const { getByTitle } = render(<App />);
  expect(getByTitle("Big Buck Bunny")).toBeInTheDocument();
});
