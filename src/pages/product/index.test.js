import { render, screen } from '@testing-library/react';
import Product from './index';
import {BrowserRouter} from 'react-router-dom';

describe('Product page', () => {
    test('Complete product', () => {
      render(<Product />, {wrapper: BrowserRouter});
      
      const productPageDiscount = screen.queryByText('-17%');
      expect(productPageDiscount).toBeInTheDocument();

      const productPageImage = screen.queryByRole('img');
      expect(productPageImage).toBeInTheDocument();
        
      const productPageBrand = screen.queryByRole('heading', {level: 6, name: 'Brand'});
      expect(productPageBrand).toBeInTheDocument();
  
      const productPageTitle = screen.queryByRole('heading', {level: 4, name: 'T-Shirt'});
      expect(productPageTitle).toBeInTheDocument();
  
      const productPagePrice = screen.queryByRole('heading', {level: 4, name: '$15.00 / $18.00'});
      expect(productPagePrice).toBeInTheDocument();
      
      const productPageSelectBox = screen.queryByRole('combobox');
      expect(productPageSelectBox).toBeInTheDocument();

      const productPageSelectOption = screen.queryAllByRole('option');
      expect(productPageSelectOption).toHaveLength(6);
  
      const productPageShipping = screen.queryByRole('heading', {level: 6, name: 'Free Shipping'});
      expect(productPageShipping).toBeInTheDocument();
  
      const productPageDescription = screen.queryByText(/Lorem ipsum dolor sit amet consectetur/i);
      expect(productPageDescription).toBeInTheDocument();

      const productPageButtonElement = screen.getByText(/Add to cart/i);
      expect(productPageButtonElement).toBeInTheDocument();
    });
})
