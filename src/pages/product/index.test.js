import { fireEvent, screen } from '@testing-library/react';

import Product from '.';
import { addToCart } from '../../features/cart/cartSlice';
import { fetchProducts } from '../../features/products/productsSlice';
import { renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../app/store';

const product = 
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
  }
;

describe('Product page', () => {
  test('Complete component', async () => {
    
    renderWithProviders(<Product />, { path: '/product/100'});
    
    const productPageDiscount = await screen.findByText('-25%');
    expect(productPageDiscount).toBeInTheDocument();

    const productPageImage = await screen.findByRole('img');
    expect(productPageImage).toBeInTheDocument();

    const productPageImageAlt = await screen.findByAltText('Lorem ipsum dolor sit amet consectetur.');
    expect(productPageImageAlt).toBeInTheDocument();
      
    const productPageBrand = await screen.findByRole('heading', {level: 6, name: 'brandA'});
    expect(productPageBrand).toBeInTheDocument();

    const productPageTitle = await screen.findByRole('heading', {level: 2, name: 'titleA'});
    expect(productPageTitle).toBeInTheDocument();

    const productPagePrice = await screen.findByRole('heading', {level: 4, name: '£15.00 / £20.00'});
    expect(productPagePrice).toBeInTheDocument();
    
    const productPageSelectBox = await screen.findByRole('combobox');
    expect(productPageSelectBox).toBeInTheDocument();
    expect(productPageSelectBox.value).toBe('1');

    const productPageSelectOption = await screen.findAllByRole('option');
    expect(productPageSelectOption).toHaveLength(3);

    const productPageDescription = await screen.findByText(/Lorem ipsum dolor sit amet consectetur/i);
    expect(productPageDescription).toBeInTheDocument();

    const productPageShipping = await screen.findByRole('heading', {level: 6, name: 'Free Shipping'});
    expect(productPageShipping).toBeInTheDocument();

    const productTotal = await screen.findByTestId('total');
    expect(productTotal).toBeInTheDocument();
    expect(productTotal.innerHTML).toBe('£15.00');

    const productPageButtonElement = await screen.findByText(/Add to cart/i);
    expect(productPageButtonElement).toBeInTheDocument();

  });

  test('Without discount', async () => {
    
    renderWithProviders(<Product />, { path: '/product/101'});
    
    const productPageDiscount = screen.queryByText('-0%');
    expect(productPageDiscount).not.toBeInTheDocument();

    const productPageImage = await screen.findByRole('img');
    expect(productPageImage).toBeInTheDocument();

    const productPageImageAlt = await screen.findByAltText('Lorem ipsum dolor sit amet consectetur.');
    expect(productPageImageAlt).toBeInTheDocument();
      
    const productPageBrand = await screen.findByRole('heading', {level: 6, name: 'brandB'});
    expect(productPageBrand).toBeInTheDocument();

    const productPageTitle = await screen.findByRole('heading', {level: 2, name: 'titleB'});
    expect(productPageTitle).toBeInTheDocument();

    const productPagePrice = await screen.findByRole('heading', {level: 4, name: '£10.00'});
    expect(productPagePrice).toBeInTheDocument();
    
    const productPageSelectBox = await screen.findByRole('combobox');
    expect(productPageSelectBox).toBeInTheDocument();
    expect(productPageSelectBox.value).toBe('1');

    const productPageSelectOption = await screen.findAllByRole('option');
    expect(productPageSelectOption).toHaveLength(15);

    const productPageDescription = await screen.findByText(/Lorem ipsum dolor sit amet consectetur/i);
    expect(productPageDescription).toBeInTheDocument();

    const productPageShipping = await screen.findByRole('heading', {level: 6, name: 'Free Shipping'});
    expect(productPageShipping).toBeInTheDocument();

    const productTotal = await screen.findByTestId('total');
    expect(productTotal).toBeInTheDocument();
    expect(productTotal.innerHTML).toBe('£10.00');

    const productPageButtonElement = await screen.findByText(/Add to cart/i);
    expect(productPageButtonElement).toBeInTheDocument();

  });

  test('Without free shipping', async () => {
    
    renderWithProviders(<Product />, { path: '/product/102'});
    
    const productPageDiscount = await screen.findByText('-33%');
    expect(productPageDiscount).toBeInTheDocument();

    const productPageImage = await screen.findByRole('img');
    expect(productPageImage).toBeInTheDocument();

    const productPageImageAlt = await screen.findByAltText('Lorem ipsum dolor sit amet consectetur.');
    expect(productPageImageAlt).toBeInTheDocument();
      
    const productPageBrand = await screen.findByRole('heading', {level: 6, name: 'brandC'});
    expect(productPageBrand).toBeInTheDocument();

    const productPageTitle = await screen.findByRole('heading', {level: 2, name: 'titleC'});
    expect(productPageTitle).toBeInTheDocument();

    const productPagePrice = await screen.findByRole('heading', {level: 4, name: '£20.00 / £30.00'});
    expect(productPagePrice).toBeInTheDocument();
    
    const shippingCost = await screen.findByTestId('shipping-cost');
    expect(shippingCost).toBeInTheDocument();
    expect(shippingCost.innerHTML).toBe('£3.00');
    
    const productPageSelectBox = await screen.findByRole('combobox');
    expect(productPageSelectBox).toBeInTheDocument();
    expect(productPageSelectBox.value).toBe('1');

    const productPageSelectOption = await screen.findAllByRole('option');
    expect(productPageSelectOption).toHaveLength(21);

    const productPageDescription = await screen.findByText(/Lorem ipsum dolor sit amet consectetur/i);
    expect(productPageDescription).toBeInTheDocument();

    const productPageShipping = screen.queryByRole('heading', {level: 6, name: 'Free Shipping'});
    expect(productPageShipping).not.toBeInTheDocument();

    const productTotal = await screen.findByTestId('total');
    expect(productTotal).toBeInTheDocument();
    expect(productTotal.innerHTML).toBe('£23.00');

    const productPageButtonElement = await screen.findByText(/Add to cart/i);
    expect(productPageButtonElement).toBeInTheDocument();

  });

  test('In the cart', async () => {
    const store = setupStore();
    await store.dispatch(fetchProducts());
    await store.dispatch(addToCart({...product, quantity: 2}));
    renderWithProviders(<Product />, { path: '/product/100', store });
    
    const productPageSelectBox = await screen.findByRole('combobox');
    // screen.debug()
    expect(productPageSelectBox).toBeInTheDocument();
    expect(productPageSelectBox.value).toBe('2');

    const productPageButtonElement = await screen.findByText(/Remove from cart/i);
    expect(productPageButtonElement).toBeInTheDocument();
    // screen.debug()

  });

  test('Change quantity', async () => {
    const str = setupStore();
    await str.dispatch(fetchProducts());
    await str.dispatch(addToCart({...product}));
    
    renderWithProviders(<Product />, { path: '/product/100', store: str });

    let totalProduct = await screen.findByTestId('total');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£30.00');
    
    const select = screen.getByTestId('select');
    expect(select.value).toBe("2");
    
    fireEvent.click(select, { target: { value: 1 } });
    fireEvent(select, new MouseEvent('change', {bubbles: true, cancelable: true, target: { value: 1 }}));

    const options = screen.getAllByTestId('option');
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    
    totalProduct = await screen.findByTestId('total');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£15.00');

  });

  test('Change quantity when is not in the cart', async () => {
    renderWithProviders(<Product />, { path: '/product/100' });

    let totalProduct = await screen.findByTestId('total');
    expect(totalProduct).toBeInTheDocument();
    expect(totalProduct.innerHTML).toBe('£15.00');
    
    const select = screen.getByTestId('select');
    fireEvent.click(select, { target: { value: 2 } });
    fireEvent(select, new MouseEvent('change', {bubbles: true, cancelable: true, target: { value: 2 }}));

    const options = screen.getAllByTestId('option');
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();

  });
  
  test('Add to cart', async () => {    
    renderWithProviders(<Product />, { path: '/product/100'});
    
    const addButton = await screen.findByRole('button', {name: 'Add to cart'});
    fireEvent.click(addButton);
    const removeButton = await screen.findByRole('button', {name: 'Remove from cart'});
    expect(removeButton).toBeInTheDocument();

  });

  test('Remove from cart', async () => {  
    const str = setupStore();
    await str.dispatch(fetchProducts());
    await str.dispatch(addToCart({...product}));
    
    renderWithProviders(<Product />, { path: '/product/100', store: str });

    const removeButton = await screen.findByRole('button', {name: 'Remove from cart'});
    fireEvent.click(removeButton);
    const addButton = await screen.findByRole('button', {name: 'Add to cart'});
    expect(addButton).toBeInTheDocument();

  });
});
