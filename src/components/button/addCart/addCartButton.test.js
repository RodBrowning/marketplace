import { render, screen } from '@testing-library/react';
import AddCartButton from './addCartButton';
import user from '@testing-library/user-event';

describe('Add cart button',()=>{
  test('Should render add cart button', () => {
    render(<AddCartButton />);
      const buttonElement = screen.getByText(/Add to cart/i);
      expect(buttonElement).toBeInTheDocument();
  });
  
  test('Should render disabled cart button', async () => {
    render(<AddCartButton disabled={true} />);
      expect(screen.getByRole('button')).toHaveClass('disabled');
  });
  
  test('Click test', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    user.setup();
    render(<AddCartButton buttonAction={()=> alert('ok')}/>);
      const buttonElement = screen.getByText(/Add to cart/i);
      expect(buttonElement).toBeInTheDocument();
  
      await user.click(buttonElement);
      expect(window.alert).toBeCalled();
  });
});
