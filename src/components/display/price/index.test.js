import { render, screen } from '@testing-library/react';
import PriceDisplay from './index';

describe('Price display', () => {
    test('Should display $15.00 / $18.00', () => {
      render(<PriceDisplay price={15} oldPrice={18} />);
        
      const priceWithOldPrice = screen.queryByRole('heading', {level: 4, name: '$15.00 / $18.00'});
      expect(priceWithOldPrice).toBeInTheDocument();
    });

    test('Should display $15.00', () => {
      render(<PriceDisplay price={15} />);
        
      const price = screen.queryByRole('heading', {level: 4, name: '$15.00'});
      expect(price).toBeInTheDocument();
    });
})
