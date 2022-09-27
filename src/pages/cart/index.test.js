import { render, screen } from '@testing-library/react';
import Cart from './index';
import {BrowserRouter} from 'react-router-dom';

test('Cart page', () => {
  render(<Cart />, {wrapper: BrowserRouter});
  
  const checkoutTable = screen.queryByRole("table");
  expect(checkoutTable).toBeInTheDocument();

  const numberColumn = screen.queryByText(/#/);
  expect(numberColumn).toBeInTheDocument();

  const titileColumn = screen.queryByText(/Title/);
  expect(titileColumn).toBeInTheDocument();

  const quantityColumn = screen.queryByText(/Quantity/);
  expect(quantityColumn).toBeInTheDocument();

  const priceColumn = screen.queryByText(/Price/);
  expect(priceColumn).toBeInTheDocument();

  const shippingColumn = screen.queryByText(/Shipping/);
  expect(shippingColumn).toBeInTheDocument();

  const rowsNumber = screen.queryAllByRole('row');
  expect(rowsNumber.length).toBeGreaterThanOrEqual(1);

  const checkoutButton = screen.queryByText(/Checkout/);
  expect(checkoutButton).toBeInTheDocument();
    
});
