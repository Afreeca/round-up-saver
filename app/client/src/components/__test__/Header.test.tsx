// Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('renders Header component', () => {
  render(<Header />);
  const logo = screen.getByAltText('starling logo');
  expect(logo).toBeInTheDocument();
});
