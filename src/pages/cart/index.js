import './style.scss';
import './style-mobile.scss';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { numToCurrency } from '../../utils/utils';

import CheckoutButton from '../../components/button/checkout/checkout';
import QuantitySelector from '../../components/quantitySelector';
import RemoveCartShortButton from '../../components/button/removeCartShortButton/removeCartShortButton';

const Cart = () => {
    const {list: cartList, total, totalProducts, totalShipping} = useSelector((state) => state.cart);
    const {productsCurrencyInfo} = useSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        let timeout;
        if(cartList.length === 0) {
            timeout = setTimeout(() => navigate('/'), 1000);
        }
        return () => {
            clearTimeout(timeout);
        }
    },[navigate, cartList.length]);

    const handleQuantityChange = (product, quantity) => {
        dispatch(removeFromCart({...product, quantity}));
        dispatch(addToCart({...product, quantity}));
    }
    
    return (
        <>
        {cartList.length === 0 ? <h3 className="empty-cart">Empty cart</h3> :
            <section id='card-container'>
                <div className="products-list">
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>brand</th>
                                <th>Title</th>
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
                                    handleQuantityChange={(quantity) => {handleQuantityChange(product ,quantity)}}
                                    handleRemoveFromCart={()=>{dispatch(removeFromCart(product))}} 
                                />)
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4"></td>
                                <td>{numToCurrency(totalProducts ,{ locale: productsCurrencyInfo.locale, currencyCode: productsCurrencyInfo.currencyCode })}</td>
                                <td>{totalShipping > 0 ? numToCurrency(totalShipping ,{ locale: productsCurrencyInfo.locale, currencyCode: productsCurrencyInfo.currencyCode }) : <span className='free-shipping'>Free</span>}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="total-container">
                    <h5><span>Total</span>{numToCurrency(total ,{ locale: productsCurrencyInfo.locale, currencyCode: productsCurrencyInfo.currencyCode })}</h5>
                </div>
                <div className="action-container">
                    <CheckoutButton />
                </div>
            </section>}
        </>
    );
}

const TableRow = ({product, index, handleQuantityChange, handleRemoveFromCart}) => {
    const navigate = useNavigate();
    return (
        <tr onClick={()=> navigate(`/product/${product.id}`)}>
            <td>{String(index+1).padStart(2,"0")}</td>
            <td>{product.brand}</td>
            <td>{product.title}</td>
            <td onClick={(event)=> event.stopPropagation()}>
                <QuantitySelector 
                    quantity={product.availableQuantity}
                    initialQuantity={product.quantity} 
                    handleQuantityChange={(quantity)=>{handleQuantityChange(quantity)}}
                />
            </td>
            <td>
                {numToCurrency(product.price.value * product.quantity,{ locale: product.price.currencyInfo.locale, currencyCode: product.price.currencyInfo.currencyCode })}
                </td>
            <td className={product.freeShipping ? 'free-shipping' : ''}>
                {product.freeShipping && '-'}
                {numToCurrency(product.price.shipping ,{ locale: product.price.currencyInfo.locale, currencyCode: product.price.currencyInfo.currencyCode })}
                </td>
            <td onClick={(event)=> event.stopPropagation()}>
                <RemoveCartShortButton
                    buttonAction={handleRemoveFromCart} 
                    disabled={false}
                    />
            </td>
        </tr>
    )
}
    
export default Cart;
