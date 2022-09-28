import './style.scss';
import './style-mobile.scss';

import CheckoutButton from '../../components/button/checkout/checkout';
import QuantitySelector from '../../components/quantitySelector';
import RemoveCartShortButton from '../../components/button/removeCartShortButton/removeCartShortButton';
import { numToCurrency } from '../../utils/utils';

const Cart = () => {
    
    return (
        <section id='card-container'>
            <div className="products-list">
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Shipping</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mustang</td>
                            <td>
                                <QuantitySelector quantity={16}/>
                            </td>
                            <td>{numToCurrency(15.222,{ locale: "en-GB", currencyCode: "GBP" })}</td>
                            <td>{numToCurrency(222,{ locale: "en-GB", currencyCode: "GBP" })}</td>
                            <td>
                                <RemoveCartShortButton />
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Mustang</td>
                            <td>
                                <QuantitySelector quantity={200}/>
                            </td>
                            <td>{numToCurrency(15.222,{ locale: "en-GB", currencyCode: "GBP" })}</td>
                            <td className='free-shipping'>Free shipping</td>
                            <td>
                                <RemoveCartShortButton />
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Mustang</td>
                            <td>
                                <QuantitySelector quantity={6}/>
                            </td>
                            <td>{numToCurrency(15565.89,{ locale: "en-GB", currencyCode: "GBP" })}</td>
                            <td>{numToCurrency(15.89,{ locale: "en-GB", currencyCode: "GBP" })}</td>
                            <td>
                                <RemoveCartShortButton />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="total-container">
                <h5><span>Total</span>15.222.00</h5>
            </div>
            <div className="action-container">
                <CheckoutButton />
            </div>
        </section>
        );
    }
    
export default Cart;
