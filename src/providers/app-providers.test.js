import AppProviders from './app-providers';
import { render } from '@testing-library/react';

test('renders application', () => {
  render(<AppProviders />);
});
