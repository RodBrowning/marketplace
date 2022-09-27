import { render, screen } from '@testing-library/react';
import Product from './index';
import {BrowserRouter} from 'react-router-dom';

describe('Product page', () => {
    test('Complete product', () => {
      render(<Product />, {wrapper: BrowserRouter});
      
      const productPageDiscount = screen.getByText('-17%');
      expect(productPageDiscount).toBeInTheDocument();

      const productPageImage = screen.getByRole('img');
      expect(productPageImage).toBeInTheDocument();
        
      const productPageBrand = screen.getByRole('heading', {level: 6, name: 'Brand'});
      expect(productPageBrand).toBeInTheDocument();
  
      const productPageTitle = screen.getByRole('heading', {level: 4, name: 'T-Shirt'});
      expect(productPageTitle).toBeInTheDocument();
  
      const productPagePrice = screen.getByRole('heading', {level: 4, name: '$15.00 / $18.00'});
      expect(productPagePrice).toBeInTheDocument();
      
      const productPageSelectBox = screen.getByRole('combobox');
      expect(productPageSelectBox).toBeInTheDocument();

      const productPageSelectOption = screen.getAllByRole('option');
      expect(productPageSelectOption).toHaveLength(6);
  
      const productPageShipping = screen.getByRole('heading', {level: 6, name: 'Free Shipping'});
      expect(productPageShipping).toBeInTheDocument();
  
      const productPageDescription = screen.getByText(/Lorem ipsum dolor sit amet consectetur/i);
      expect(productPageDescription).toBeInTheDocument();

      const productPageButtonElement = screen.getByText(/Add to cart/i);
      expect(productPageButtonElement).toBeInTheDocument();
    });
})
