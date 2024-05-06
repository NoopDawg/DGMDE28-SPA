import { render, screen } from '@testing-library/react';
import App_foo from './App_foo';

test('renders learn react link', () => {
  render(<App_foo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
