import { render, screen } from '@testing-library/react';

import HorizontalCard from './index';
import { renderWithProviders } from '../../../utils/test-utils';
import testImage from '../testImage.jpg';

describe('Horizontal card', () => {
  test('Complete', () => {
    const product = 
    {
      id: 100,
      brand: "Brand",
      title: "T-Shirt",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
      freeShipping: true,
      newest: true,
      price: {
          value: 15,
          oldValue: 18,
          shipping: 2,
          currencyInfo: {
              locale: "en-GB",
              currencyCode: "GBP"
          }
      },
      imageURL: testImage,
      imageAlt: "Lorem ipsum dolor sit amet consectetur.",
      availableQuantity: 3,
      quantity: 2
      }
    ;
    render(<HorizontalCard product={product} />);
          
      const horizontalCardBrand = screen.getByRole('heading', {level: 6, name: 'Brand'});
      expect(horizontalCardBrand).toBeInTheDocument();
  
      const horizontalCardTitle = screen.getByRole('heading', {level: 3, name: 'T-Shirt'});
      expect(horizontalCardTitle).toBeInTheDocument();
  
      const horizontalCardPrice = screen.getByRole('heading', {level: 6, name: 'Price £15.00'});
      expect(horizontalCardPrice).toBeInTheDocument();
  
      const horizontalCardShipping = screen.getByRole('button', {name: 'Shop now'});
      expect(horizontalCardShipping).toBeInTheDocument();

      const horizontalCardImage = screen.getByRole('img');
      expect(horizontalCardImage).toBeInTheDocument();
  
  });
  
});
