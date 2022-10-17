import './style.scss';
import './style-mobile.scss';

import { getPercentage, truncateString } from '../../../utils/utils';

import AddCartButton from '../../button/addCart/addCartButton';
import DiscountDisplay from '../../display/discount';
import PriceDisplay from '../../display/price';
import RemoveCartButton from '../../button/removeCart/removeCartButton';
import parse from 'html-react-parser';

let count = 0;
const VerticalCard = ({
        product,
        goToProductPageHandler, 
        handleAddToCart, 
        handleRemoveFromCart, 
        isInTheCart
    }) => {

    console.log("rendered vCard: ", count++)
    return (
        <div id="vertical-card"  onClick={()=>{goToProductPageHandler()}} data-testid="vertical-card">
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
                    <AddCartButton buttonAction={handleAddToCart} />
                }
                {isInTheCart &&
                    <RemoveCartButton buttonAction={handleRemoveFromCart} />
                }
            </div>
        </div>
    );
}

export default VerticalCard;

                