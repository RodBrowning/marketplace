import './style.scss';
import './style-mobile.scss';

import { numToCurrency } from '../../../utils/utils';

const HorizontalCard = ({brand, title, image, imageAlt, price, currencyInfo, goToProductPageHandler}) => {
    return (
        <div id='horizontal-card' onClick={()=>{goToProductPageHandler()}} data-testid="horizontal-card">
            <div className="description">
                <h6 className="brand">{brand}</h6>
                <h3 className="title">{title}</h3>
                <h6 className="price">Price <span>{numToCurrency(price, currencyInfo)}</span></h6>
                <button className='action-btn'><span>Shop now</span></button>
            </div>
            <div className="image">
                <img src={image} alt={imageAlt} />
            </div>
        </div>
    );
}

export default HorizontalCard;
