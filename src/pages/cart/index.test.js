import { fireEvent, screen } from '@testing-library/react';

import Cart from '.';
import { addToCart } from '../../features/cart/cartSlice';
import { fetchProducts } from '../../features/products/productsSlice';
import { renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../app/store'
import user from '@testing-library/user-event';

const products = [
  {
    id: 100,
    brand: "brandA",
    title: "titleA",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
    freeShipping: true,
    newest: true,
    price: {
        value: 15,
        oldValue: 20,
        shipping: 2,
        currencyInfo: {
            locale: "en-GB",
            currencyCode: "GBP"
        }
    },
    imageURL: "https://mock-products.herokuapp.com/images/TomyPocketGames.jpg",
    imageAlt: "Lorem ipsum dolor sit amet consectetur.",
    availableQuantity: 3,
    quantity: 2
  },{
    id: 103,
    brand: "brandD",
    title: "titleD",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
    freeShipping: true,
    newest: false,
    price: {
        value: 50,
        shipping: 1,
        currencyInfo: {
            locale: "en-GB",
            currencyCode: "GBP"
        }
    },
    imageURL: "https://mock-products.herokuapp.com/images/TycoRCPro-Am.jpg",
    imageAlt: "Lorem ipsum dolor sit amet consectetur.",
    availableQuantity: 30,
    quantity: 10
  },{
    id: 104,
    brand: "brandE",
    title: "titleE",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
    freeShipping: false,
    newest: false,
    price: {
        value: 10,
        shipping: 2,
        currencyInfo: {
            locale: "en-GB",
            currencyCode: "GBP"
        }
    },
    imageURL: "https://mock-products.herokuapp.com/images/MattelSkip-Bo.jpg",
    imageAlt: "Lorem ipsum dolor sit amet consectetur.",
    availableQuantity: 7,
    quantity: 5
  },{
    id: 105,
    brand: "brandF",
    title: "titleF",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.",
    freeShipping: true,
    newest: false,
    price: {
        value: 10,
        shipping: 2,
        currencyInfo: {
            locale: "en-GB",
            currencyCode: "GBP"
        }
    },
    imageURL: "https://mock-products.herokuapp.com/images/MattelSkip-Bo.jpg",
    imageAlt: "Lorem ipsum dolor sit amet consectetur.",
    availableQuantity: 2,
  }
];

describe('Cart page', () => {
  test('Empty cart', async () => {
      
    renderWithProviders(<Cart />, { path: '/cart'});
  
    const emptyCart = screen.getByText(/Empty cart/);
    expect(emptyCart).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 2000));
    const homeScreen = screen.getByText(/Newest/);
    expect(homeScreen).toBeInTheDocument();
  });

  test('Render table', async () => {
    
   const store = setupStore();
    await store.dispatch(fetchProducts());
    store.dispatch(addToCart({...products[0]}));
  
    renderWithProviders(<Cart />, { path: '/cart', store });
  
    const checkoutTable = await screen.findByRole("table");
    expect(checkoutTable).toBeInTheDocument();
  
    const numberColumn = await screen.findByText(/#/);
    expect(numberColumn).toBeInTheDocument();
  
    const brandColumn = await screen.findByText(/Brand/, { timeout: 2000});
    expect(brandColumn).toBeInTheDocument();
  
    const titileColumn = await screen.findByText(/Title/, { timeout: 2000});
    expect(titileColumn).toBeInTheDocument();
  
    const quantityColumn = await screen.findByText(/Quantity/);
    expect(quantityColumn).toBeInTheDocument();
  
    const priceColumn = await screen.findByText(/Price/);
    expect(priceColumn).toBeInTheDocument();
  
    const shippingColumn = await screen.findByText(/Shipping/);
    expect(shippingColumn).toBeInTheDocument();
  
    const rowsNumber = await screen.findAllByRole('row');
    expect(rowsNumber.length).toBeGreaterThanOrEqual(1);
  
    const checkoutButton = await screen.findByText(/Checkout/);
    expect(checkoutButton).toBeInTheDocument();
  });

  test('Render products in the table', async () => {  
    const {store} = renderWithProviders(<Cart />, { path: '/cart' });

    await store.dispatch(fetchProducts());
    await store.dispatch(addToCart({...products[0]})); 
  
    let tableRows = await screen.findAllByTestId('table-row');
    expect(tableRows).toHaveLength(1);

    const brand = await screen.findByText(/brandA/i);
    expect(brand).toBeInTheDocument();

    const title = await screen.findByText(/titleA/i);
    expect(title).toBeInTheDocument();
  });

  test('Total values', async () => {  
    const {store} = renderWithProviders(<Cart />, { path: '/cart' });

    await store.dispatch(fetchProducts());
    await store.dispatch(addToCart({...products[0]}));     
    await store.dispatch(addToCart({...products[1]}));
    await store.dispatch(addToCart({...products[2]})); 
    await store.dispatch(addToCart({...products[3]})); 

    let tableRows = await screen.findAllByTestId('table-row');
    expect(tableRows).toHaveLength(4);

    let totalProduct = await screen.findByTestId('total-products');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£590.00');

    let totalShipping = await screen.findByTestId('total-shipping');
    expect(totalShipping).toBeInTheDocument();
    expect(totalShipping.innerHTML).toBe('£2.00');
    
    let totalToPay = await screen.findByRole('heading', {level: 5, name: /Total/i});
    expect(totalToPay.innerHTML).toBe('<span>Total:</span>£592.00');

  });

  test('Total values after remove product from slice', async () => {  
    const {store} = renderWithProviders(<Cart />, { path: '/cart' });

    await store.dispatch(fetchProducts());
    store.dispatch(addToCart({...products[0]}));     
    store.dispatch(addToCart({...products[1]}));
    store.dispatch(addToCart({...products[2]})); 

    let totalProduct = await screen.findByTestId('total-products');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£580.00');

    let totalShipping = await screen.findByTestId('total-shipping');
    expect(totalShipping).toBeInTheDocument();
    expect(totalShipping.innerHTML).toBe('£2.00');
    
    let totalToPay = await screen.findByRole('heading', {level: 5, name: /Total/i});
    expect(totalToPay.innerHTML).toBe('<span>Total:</span>£582.00');
    
    //Remove product from the slice
    let removeButtons = await screen.findAllByTestId('remove-from-cart');
    fireEvent.click(removeButtons[2]);

    let tableRows = await screen.findAllByTestId('table-row');
    expect(tableRows).toHaveLength(2);

    totalProduct = await screen.findByTestId('total-products');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£530.00');

    totalShipping = await screen.findByTestId('total-shipping');
    expect(totalShipping).toBeInTheDocument();
    expect(totalShipping.innerHTML).toBe('<span class=\"free-shipping\">Free</span>');

    totalToPay = await screen.findByRole('heading', {level: 5, name: /Total/i});
    expect(totalToPay.innerHTML).toBe('<span>Total:</span>£530.00');

  });

  test('Change quantity', async () => { 
    const {store} = renderWithProviders(<Cart />, { path: '/cart' });

    await store.dispatch(fetchProducts());
    store.dispatch(addToCart({...products[0]}));

    let totalProduct = await screen.findByTestId('total-products');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£30.00');

    const select = screen.getByTestId('select');
    
    fireEvent.change(select, { target: { value: 1 } });
    
    totalProduct = await screen.findByTestId('total-products');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£15.00');
    
   });

  
   test('Remove from cart', async () => { 
    const {store} = renderWithProviders(<Cart />, { path: '/cart' });
    user.setup();

    await store.dispatch(fetchProducts());
    store.dispatch(addToCart({...products[0]}));
    store.dispatch(addToCart({...products[1]}));

    let totalProduct = await screen.findByTestId('total-products');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£530.00');
    
    const deleteButton = await screen.findAllByTestId('remove-from-cart')
    await user.click(deleteButton[1]);

    totalProduct = await screen.findByTestId('total-products');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£30.00');
    
   });

  
   test('Go to product page', async () => {
    const {store} = renderWithProviders(<Cart />, { path: '/cart' });
    user.setup();

    await store.dispatch(fetchProducts());
    store.dispatch(addToCart({...products[0]}));
    
    let tableRow = await screen.findByTestId('table-row');
    expect(tableRow).toBeInTheDocument();
    await user.click(tableRow);
    expect(await screen.findByRole('img')).toBeInTheDocument();
  });

  test('Not propagate event', async () => {
    const {store} = renderWithProviders(<Cart />, { path: '/cart' });
    user.setup();

    await store.dispatch(fetchProducts());
    store.dispatch(addToCart({...products[0]}));
    
    let actionButtonsWrappers = await screen.findAllByTestId('not-propagate-click-event');
    await user.click(actionButtonsWrappers[0]);
    await user.click(actionButtonsWrappers[1]);
    let tableRow = await screen.findByTestId('table-row');
    expect(tableRow).toBeInTheDocument();
  });
});
