import { render, screen } from '@testing-library/react';
import RemoveCartButton from './removeCartButton';

test('Should render checkout button', () => {
  render(<RemoveCartButton />);
    const removeCartButton = screen.getByRole('button');
    expect(removeCartButton).toBeInTheDocument();
});
