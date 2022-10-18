import VerticalCard from './index';
import { addToCart } from '../../../features/cart/cartSlice';
import { renderComponentWithProviders } from '../../../utils/test-utils';
import { screen } from '@testing-library/react';
import { setupStore } from '../../../app/store';
import testImage from '../testImage.jpg';

describe('Vertical card', () => {
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
    renderComponentWithProviders(<VerticalCard product={product} />);
  
      const verticalCardDiscount = screen.queryByText('-17%');
      expect(verticalCardDiscount).toBeInTheDocument();

      const verticalCardImage = screen.getByRole('img');
      expect(verticalCardImage).toBeInTheDocument();
          
      const verticalCardBrand = screen.getByRole('heading', {level: 6, name: 'Brand'});
      expect(verticalCardBrand).toBeInTheDocument();
  
      const verticalCardTitle = screen.getByRole('heading', {level: 4, name: 'T-Shirt'});
      expect(verticalCardTitle).toBeInTheDocument();
  
      const verticalCardPrice = screen.getByRole('heading', {level: 4, name: '£15.00 / £18.00'});
      expect(verticalCardPrice).toBeInTheDocument();
          
      const verticalCardShipping = screen.getByRole('heading', {level: 6, name: 'Free Shipping'});
      expect(verticalCardShipping).toBeInTheDocument();
  
      const verticalCardShortDescription = screen.getByText(/Lorem ipsum dolor sit amet consectetur/i);
      expect(verticalCardShortDescription).toBeInTheDocument();
  });

  test('Without discount', () => {
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
      renderComponentWithProviders(<VerticalCard product={product} />);
  
      const verticalCardDiscount = screen.queryByText(/-0%/i);
      expect(verticalCardDiscount).not.toBeInTheDocument();

      const verticalCardImage = screen.getByRole('img');
      expect(verticalCardImage).toBeInTheDocument();
          
      const verticalCardBrand = screen.getByRole('heading', {level: 6, name: 'Brand'});
      expect(verticalCardBrand).toBeInTheDocument();
  
      const verticalCardTitle = screen.getByRole('heading', {level: 4, name: 'T-Shirt'});
      expect(verticalCardTitle).toBeInTheDocument();
  
      const verticalCardPrice = screen.getByRole('heading', {level: 4, name: '£15.00'});
      expect(verticalCardPrice).toBeInTheDocument();
  
      const verticalCardShipping = screen.queryByRole('heading', {level: 6, name: 'Free Shipping'});
      expect(verticalCardShipping).toBeInTheDocument();
  
      const verticalCardShortDescription = screen.getByText(/Lorem ipsum dolor sit amet consectetur/i);
      expect(verticalCardShortDescription).toBeInTheDocument();
  });

  test('Without free shipping', () => {
    const product = 
      {
        id: 100,
        brand: "Brand",
        title: "T-Shirt",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
        freeShipping: false,
        newest: true,
        price: {
            value: 15,
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
      renderComponentWithProviders(<VerticalCard product={product} />);
  
      const verticalCardDiscount = screen.queryByText(/-0%/i);
      expect(verticalCardDiscount).not.toBeInTheDocument();

      const verticalCardImage = screen.getByRole('img');
      expect(verticalCardImage).toBeInTheDocument();
          
      const verticalCardBrand = screen.getByRole('heading', {level: 6, name: 'Brand'});
      expect(verticalCardBrand).toBeInTheDocument();
  
      const verticalCardTitle = screen.getByRole('heading', {level: 4, name: 'T-Shirt'});
      expect(verticalCardTitle).toBeInTheDocument();
  
      const verticalCardPrice = screen.getByRole('heading', {level: 4, name: '£15.00'});
      expect(verticalCardPrice).toBeInTheDocument();
  
      const verticalCardShipping = screen.queryByRole('heading', {level: 6, name: 'Free Shipping'});
      expect(verticalCardShipping).not.toBeInTheDocument();
  
      const verticalCardShortDescription = screen.getByText(/Lorem ipsum dolor sit amet consectetur/i);
      expect(verticalCardShortDescription).toBeInTheDocument();
  });
  
  test('Should show remove from cart button', async () => {
    const product = 
      {
        id: 100,
        brand: "Brand",
        title: "T-Shirt",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
        freeShipping: false,
        newest: true,
        price: {
            value: 15,
            oldPrice: 18,
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
    const store = setupStore();
    store.dispatch(addToCart({...product}));
    renderComponentWithProviders(<VerticalCard product={product} />, {store});
        
    const removeCartButton = screen.getByText('Remove from cart');
    expect(removeCartButton).toBeInTheDocument();
  });
});
