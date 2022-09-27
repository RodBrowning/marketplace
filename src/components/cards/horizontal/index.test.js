import { render, screen } from '@testing-library/react';
import HorizontalCard from './index';
import testImage from '../testImage.jpg';

describe('Horizontal card', () => {
    test('Complete', () => {
      render(<HorizontalCard brand="Brand" title="T-Shirt" image={testImage} price={15} />);
            
        const horizontalCardBrand = screen.getByRole('heading', {level: 6, name: 'Brand'});
        expect(horizontalCardBrand).toBeInTheDocument();
    
        const horizontalCardTitle = screen.getByRole('heading', {level: 3, name: 'T-Shirt'});
        expect(horizontalCardTitle).toBeInTheDocument();
    
        const horizontalCardPrice = screen.getByRole('heading', {level: 6, name: 'Price $15.00'});
        expect(horizontalCardPrice).toBeInTheDocument();
    
        const horizontalCardShipping = screen.getByRole('button', {name: 'Shop now'});
        expect(horizontalCardShipping).toBeInTheDocument();

        const horizontalCardImage = screen.getByRole('img');
        expect(horizontalCardImage).toBeInTheDocument();
    
    });
})
