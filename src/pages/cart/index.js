import './style.scss';
import './style-mobile.scss';

import CheckoutButton from '../../components/button/checkout/checkout';
import RemoveCartButton from '../../components/button/removeCard/removeCartButton';
import QuantitySelector from '../../components/quantitySelector';
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
                            <th></th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mustang</td>
                            <td>
                                <QuantitySelector quantity={16}/>
                            </td>
                            <td>{numToCurrency(15.222)}</td>
                            <td>
                                <RemoveCartButton />
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Mustang</td>
                            <td>
                                <QuantitySelector quantity={200}/>
                            </td>
                            <td>{numToCurrency(15.222)}</td>
                            <td>
                                <RemoveCartButton />
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Mustang</td>
                            <td>
                                <QuantitySelector quantity={6}/>
                            </td>
                            <td>{numToCurrency(15565.89)}</td>
                            <td>
                                <RemoveCartButton />
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
