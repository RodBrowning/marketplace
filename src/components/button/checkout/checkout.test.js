import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import CheckoutButton from './checkout';

describe('Add checkout button',()=>{
  test('Should render checkout button', () => {
    render(<CheckoutButton />);
    const checkoutButton = screen.getByRole('button', {name: /Checkout/i});
     expect(checkoutButton).toBeInTheDocument();
  });
  
  test('Should display checkout alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    user.setup();
    render(<CheckoutButton />);
      const checkoutButton = screen.getByRole('button', {name: /Checkout/i});
      await user.click(checkoutButton);
      expect(window.alert).toBeCalled();
  });
});
