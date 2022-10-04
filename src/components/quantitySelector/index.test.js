import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import QuantitySelector from './index';

describe('Quantity selector', () => {
  test('Should render successfully', () => {
    render(
      <QuantitySelector quantity={5} />);
      
      const selectBox = screen.getByRole('combobox');
      expect(selectBox).toBeInTheDocument();

      const selectOption = screen.queryAllByRole('option');
      expect(selectOption).toHaveLength(5);
  });

  test('Should change successfully', async () => {
    user.setup();
    render(
      <QuantitySelector quantity={10} handleChange={()=>alert('ok')}/>);
      
      const selectBox = screen.getByRole('combobox');
      await user.selectOptions(selectBox, ['2']);
      expect(selectBox.value).toBe('2');
  });
});
