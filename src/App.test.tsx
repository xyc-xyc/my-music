import { render, screen } from '@testing-library/react';
import App from './App';

test('renders play button', () => {
  render(<App />);
  const element = screen.getByText("play")
  expect(element).toBeInTheDocument();
});
