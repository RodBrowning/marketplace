import App from './App';
import { renderWithProviders } from './utils/test-utils';

test('renders application', () => {
  renderWithProviders(<App />);
});
