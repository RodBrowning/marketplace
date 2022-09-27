import { render, screen } from '@testing-library/react';
import AddCartButton from './addCartButton';

test('Should render add cart button', () => {
  render(<AddCartButton />);
    const buttonElement = screen.getByText(/Add to cart/i);
    expect(buttonElement).toBeInTheDocument();
});
