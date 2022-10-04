import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../app/store'
import App from '../App';
import { MemoryRouter} from 'react-router-dom';

export function renderWithProviders(
  ui,
  {
    path = '/',
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
        <Provider store={store}>
            <MemoryRouter
                initialEntries={[path]}
                initialIndex={0}
            >
              <App>
                {children}
              </App>
            </MemoryRouter>
        </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}