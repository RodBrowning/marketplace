import { render, screen } from '@testing-library/react';
import Cart from './index';
import {BrowserRouter} from 'react-router-dom';

test('Cart page', () => {
  render(<Cart />, {wrapper: BrowserRouter});
  
  const checkoutTable = screen.getByRole("table");
  expect(checkoutTable).toBeInTheDocument();

  const numberColumn = screen.getByText(/#/);
  expect(numberColumn).toBeInTheDocument();

  const titileColumn = screen.getByText(/Title/);
  expect(titileColumn).toBeInTheDocument();

  const quantityColumn = screen.getByText(/Quantity/);
  expect(quantityColumn).toBeInTheDocument();

  const priceColumn = screen.getByText(/Price/);
  expect(priceColumn).toBeInTheDocument();

  const shippingColumn = screen.getByText(/Shipping/);
  expect(shippingColumn).toBeInTheDocument();

  const rowsNumber = screen.getAllByRole('row');
  expect(rowsNumber.length).toBeGreaterThanOrEqual(1);

  const checkoutButton = screen.getByText(/Checkout/);
  expect(checkoutButton).toBeInTheDocument();
    
});
