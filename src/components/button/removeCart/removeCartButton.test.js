import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import RemoveCartButton from './removeCartButton';

describe('Remove cart button',()=>{
  test('Should render successfully', () => {
    render(<RemoveCartButton />);
      const removeCartButton = screen.getByRole('button');
      expect(removeCartButton).toBeInTheDocument();
  });
  
  test('Should disabled', async () => {
    render(<RemoveCartButton disabled={true} />);
      expect(screen.getByRole('button')).toHaveClass('disabled');
  });
  
  test('Should call function hadler when click', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    user.setup();
    render(<RemoveCartButton buttonAction={()=> alert('ok')}/>);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
  
      await user.click(buttonElement);
      expect(window.alert).toBeCalled();
  });
});
