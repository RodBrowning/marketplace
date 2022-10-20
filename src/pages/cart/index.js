import './style.scss';
import './style-mobile.scss';

import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import CheckoutButton from '../../components/button/checkout/checkout';
import QuantitySelector from '../../components/quantitySelector';
import RemoveCartShortButton from '../../components/button/removeCartShortButton/removeCartShortButton';
import { numToCurrency } from '../../utils/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const {list: cartList, total, totalProducts, totalShipping} = useAppSelector((state) => state.cart);
    const {productsCurrencyInfo} = useAppSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        let timeout;
        if(cartList.length === 0) {
            timeout = setTimeout(() => navigate('/'), 1000);
        }
        return () => {
            clearTimeout(timeout);
        }
    },[navigate, cartList.length]);

    const handleQuantityEvent = (product, quantity) => {
        dispatch(removeFromCart({...product, quantity}));
        dispatch(addToCart({...product, quantity}));
    }
    
    return (
        <>
        {cartList.length === 0 ? <h3 className="empty-cart">Empty cart</h3> :
            <section id='cart-container'>
                <div className="products-list">
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Brand</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Shipping</th>
                                <th></th>
                            </tr>
                            {cartList.map((product, index)=>{
                                return (<TableRow 
                                    key={product.id}
                                    product={product} 
                                    index={index}
                                    handleQuantityChange={(quantity) => {handleQuantityEvent(product ,quantity)}}
                                    handleRemoveFromCart={()=>{dispatch(removeFromCart(product))}} 
                                />)
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4"></td>
                                <td data-testid="total-products">{numToCurrency(totalProducts ,{ locale: productsCurrencyInfo.locale, currencyCode: productsCurrencyInfo.currencyCode })}</td>
                                <td data-testid="total-shipping">{totalShipping > 0 ? numToCurrency(totalShipping ,{ locale: productsCurrencyInfo.locale, currencyCode: productsCurrencyInfo.currencyCode }) : <span className='free-shipping'>Free</span>}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="total-container">
                    <h5><span>Total:</span>{numToCurrency(total ,{ locale: productsCurrencyInfo.locale, currencyCode: productsCurrencyInfo.currencyCode })}</h5>
                </div>
                <div className="action-container">
                    <CheckoutButton />
                </div>
            </section>}
        </>
    );
};

const TableRow = ({product, index, handleQuantityChange, handleRemoveFromCart}) => {
    const navigate = useNavigate();
    return (
        <tr onClick={()=> navigate(`/product/${product.id}`)} 
        data-testid="table-row">
            <td>{String(index+1).padStart(2,"0")}</td>
            <td>
                <img src={product.imageURL} alt={product.imageAlt} />
            </td>
            <td>{product.title}</td>
            <td>{product.brand}</td>
            <td onClick={(event)=> event.stopPropagation()} data-testid="not-propagate-click-event">
                <QuantitySelector 
                    quantity={product.availableQuantity}
                    initialQuantity={product.quantity} 
                    handleChange={(quantity)=>{handleQuantityChange(quantity)}}
                />
            </td>
            <td>
                {numToCurrency(product.price.value * product.quantity,{ locale: product.price.currencyInfo.locale, currencyCode: product.price.currencyInfo.currencyCode })}
                </td>
            <td className={product.freeShipping ? 'free-shipping' : ''}>
                {product.freeShipping && '-'}
                {numToCurrency(product.price.shipping ,{ locale: product.price.currencyInfo.locale, currencyCode: product.price.currencyInfo.currencyCode })}
                </td>
            <td onClick={(event)=> event.stopPropagation()} data-testid="not-propagate-click-event">
                <RemoveCartShortButton
                    buttonAction={handleRemoveFromCart} 
                    disabled={false}
                    />
            </td>
        </tr>
    )
};
    
export default Cart;
