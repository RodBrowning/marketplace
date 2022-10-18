import './style.scss';
import './style-mobile.scss';

import { numToCurrency } from '../../../utils/utils';

const HorizontalCard = ({product}) => {
    return (
        <div id='horizontal-card'>
            <div className="description">
                <h6 className="brand">{product.brand}</h6>
                <h3 className="title">{product.title}</h3>
                <h6 className="price">Price <span>{numToCurrency(product.price.value, product.price.currencyInfo)}</span></h6>
                <button className='action-btn'><span>Shop now</span></button>
            </div>
            <div className="image">
                <img src={product.imageURL} alt={product.imageAlt} />
            </div>
        </div>
    );
}

export default HorizontalCard;
