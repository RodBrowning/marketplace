import './style.scss';
import './style-mobile.scss';

import { addToCart, removeFromCart } from '../../../features/cart/cartSlice';
import { getPercentage, truncateString } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import AddCartButton from '../../button/addCart/addCartButton';
import DiscountDisplay from '../../display/discount';
import PriceDisplay from '../../display/price';
import RemoveCartButton from '../../button/removeCart/removeCartButton';
import parse from 'html-react-parser';

const VerticalCard = ({
        product
    }) => {
    const cartList = useAppSelector((state) => state.cart.list);
    const isInTheCart = cartList.some((cartProduct) => cartProduct.id === product.id );
    const dispatch = useAppDispatch();

    const handleAdd = () => {
        dispatch(addToCart({ ...product }));
    }
    const handleRemove = () => {
        dispatch(removeFromCart(product));
    }
    
    return (
        <div id="vertical-card" data-testid="vertical-card">
            <div className="card-img">
                <DiscountDisplay discount={getPercentage(product.price.value, product.price.oldValue)} />
                <img src={product.imageURL} alt={product.imageAlt} />
            </div>
            <div className="card-body">
                <h6 className="brand">{product.brand}</h6>
                <h4 className="title">{product.title}</h4>
                <PriceDisplay price={product.price.value} oldPrice={product.price.oldValue} currencyInfo={product.price.currencyInfo}/>
                <p className="short-desc">{parse(truncateString(product.description, 120, true))}</p>
                {product.freeShipping && <h6 className="shipping">Free Shipping</h6>}
                {!isInTheCart &&
                    <AddCartButton buttonAction={handleAdd} />
                }
                {isInTheCart &&
                    <RemoveCartButton buttonAction={handleRemove} />
                }
            </div>
        </div>
    );
}

export default VerticalCard;

                