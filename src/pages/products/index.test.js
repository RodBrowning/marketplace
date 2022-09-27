import { render, screen } from '@testing-library/react';
import Products from './index';
import {BrowserRouter} from 'react-router-dom';

test('Render products page', () => {
  render(<Products />, {wrapper: BrowserRouter});
  
  const newestTitle = screen.getByRole('heading', {level: 1, name: "Newest"});
  expect(newestTitle).toBeInTheDocument();

  const productsTitle = screen.getByRole('heading', {level: 1, name: "90's Products"});
  expect(productsTitle).toBeInTheDocument();
});
