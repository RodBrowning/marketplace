import './style.scss';
import './style-mobile.scss';

import { numToCurrency } from '../../../utils/utils';

const HorizontalCard = ({brand, title, image, price}) => {
    return (
        <div id='horizontal-card'>
            <div className="description">
                <h6 className="brand">{brand}</h6>
                <h3 className="title">{title}</h3>
                <h6 className="price">Price <span>{numToCurrency(price)}</span></h6>
                <button className='action-btn'><span>Shop now</span></button>
            </div>
            <div className="image">
                <img src={image} alt="" />
            </div>
        </div>
    );
}

export default HorizontalCard;
