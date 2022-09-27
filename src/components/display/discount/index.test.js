import { render, screen } from '@testing-library/react';
import DiscountDisplay from './index';

describe('Discount', () => {
    test('Should display -10%', () => {
      render(
        <DiscountDisplay discount={10} />);
        
        const discount = screen.queryByText('-10%');
        expect(discount).toBeInTheDocument();
    });
})
