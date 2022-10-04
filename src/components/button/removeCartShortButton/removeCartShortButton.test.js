import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import RemoveCartShortButton from './removeCartShortButton';

describe('Remove cart button - short version',()=>{
  test('Should render successfully', () => {
    render(<RemoveCartShortButton />);
      const removeCartShortButton = screen.getByRole('button');
      expect(removeCartShortButton).toBeInTheDocument();
  });
  
  test('Should call function hadler when click', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    user.setup();
    render(<RemoveCartShortButton buttonAction={()=> alert('ok')}/>);
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
  
      await user.click(buttonElement);
      expect(window.alert).toBeCalled();
  });
});
