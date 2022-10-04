import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import HorizontalCard from './index';
import testImage from '../testImage.jpg';

describe('Horizontal card', () => {
  test('Complete', () => {
    render(<HorizontalCard brand="Brand" title="T-Shirt" image={testImage} price={15} currencyInfo={{locale: "en-GB", currencyCode: "GBP"}} />);
          
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
  
  test('Should call function hadler when click', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    user.setup();
    render(<HorizontalCard brand="Brand" title="T-Shirt" image={testImage} price={15} currencyInfo={{locale: "en-GB", currencyCode: "GBP"}} goToProductPageHandler={() => alert('ok')}/>);
      const cardElement = screen.getByTestId('horizontal-card');
      expect(cardElement).toBeInTheDocument();

      await user.click(cardElement);
      expect(window.alert).toBeCalled();
  });
});
