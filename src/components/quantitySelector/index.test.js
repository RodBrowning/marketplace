import { render, screen } from '@testing-library/react';
import QuantitySelector from './index';

describe('Quantity selector', () => {
    test('Should render correctly', () => {
      render(
        <QuantitySelector quantity={5} />);
        
        const selectBox = screen.getByRole('combobox');
        expect(selectBox).toBeInTheDocument();

        const selectOption = screen.queryAllByRole('option');
        expect(selectOption).toHaveLength(5);
    });
})
