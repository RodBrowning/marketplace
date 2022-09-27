import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './index';
import {BrowserRouter} from 'react-router-dom';

describe('Header', () => {
    test('Should render all nav links', async () => {
      render(<Header />, {wrapper: BrowserRouter})
        
        const logoText = screen.queryByRole('heading', {level: 2, name: "90's Shop"});
        expect(logoText).toBeInTheDocument();

        const logoLink = screen.queryByRole('link', {name: "90's Shop"});
        expect(logoLink).toBeInTheDocument();

        const homeLink = screen.queryByRole('link', {name: "Home"});
        expect(homeLink).toBeInTheDocument();

        const cartLink = screen.queryAllByRole('link');
        expect(cartLink[2]).toBeInTheDocument();
    });
})
