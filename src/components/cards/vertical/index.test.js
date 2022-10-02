import { render, screen } from '@testing-library/react';
import VerticalCard from './index';
import testImage from '../testImage.jpg';

describe('Vertical card', () => {
    test('Complete', () => {
      render(<VerticalCard brand="Brand" title="T-Shirt" image={testImage} price={15} oldPrice={18} currencyInfo={{locale: "en-GB", currencyCode: "GBP"}} shortDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />);
    
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

    test('without discount', () => {
      render(<VerticalCard brand="Brand" title="T-Shirt" image={testImage} price={15}  currencyInfo={{locale: "en-GB", currencyCode: "GBP"}} shortDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />);
    
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

    test('without free shipping', () => {
      render(<VerticalCard brand="Brand" title="T-Shirt" image={testImage} price={15}  currencyInfo={{locale: "en-GB", currencyCode: "GBP"}} shortDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={false} />);
    
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
})
