import { render, screen } from '@testing-library/react';

import RemoveCartShortButton from './removeCartShortButton';

test('Should render checkout button', () => {
  render(<RemoveCartShortButton />);
    const removeCartShortButton = screen.getByRole('button');
    expect(removeCartShortButton).toBeInTheDocument();
});
