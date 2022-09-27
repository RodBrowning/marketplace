import { render, screen } from '@testing-library/react';
import CheckoutButton from './checkout';

test('Should render checkout button', () => {
  render(<CheckoutButton />);
    const checkoutButton = screen.getByText(/Checkout/i);
    expect(checkoutButton).toBeInTheDocument();
});
