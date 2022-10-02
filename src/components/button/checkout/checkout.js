import './style.scss';
import './style-mobile.scss';

const CheckoutButton = () => {
    const handleCheckout = () => alert('Thank you for buying with us!');
    return (
        <button id="checkout-btn" onClick={handleCheckout}><span>Checkout</span></button>
    )
}

export default CheckoutButton;