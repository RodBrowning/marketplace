import { render, screen } from '@testing-library/react';
import PriceDisplay from './index';

describe('Price display', () => {
  test('Should show £15.00 / £18.00', () => {
    render(<PriceDisplay price={15} oldPrice={18} currencyInfo={{locale: "en-GB", currencyCode: "GBP"}} />);
      
    const priceWithOldPrice = screen.getByRole('heading', {level: 4, name: '£15.00 / £18.00'});
    expect(priceWithOldPrice).toBeInTheDocument();
  });

  test('Should show £15.00', () => {
    render(<PriceDisplay price={15} currencyInfo={{locale: "en-GB", currencyCode: "GBP"}} />);
      
    const price = screen.getByRole('heading', {level: 4, name: '£15.00'});
    expect(price).toBeInTheDocument();
  });
});
