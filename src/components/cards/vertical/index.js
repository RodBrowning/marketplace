import './style.scss';
import './style-mobile.scss';

import { numToCurrency, truncateString } from '../../../utils/utils';
import { useEffect, useState } from 'react';

import parse from 'html-react-parser';

const getPercentage = (price, oldPrice) => {
    return (price * 100) / oldPrice;
}

const VerticalCard = ({brand, title, image, price, oldPrice, shortDesc, shipping}) => {
    const [discount, setDiscount] = useState(0)
    useEffect(() => {
        if (price && oldPrice !== undefined) {
            setDiscount(getPercentage(price, oldPrice));
        }
    }, []); 
    
    return (
        <div id="vertical-card">
            {discount > 0 ? <div className="discount-flag"><p>-{discount}%</p></div> : ""}
            <div className="card-img">
                <img src={image} alt="" />
            </div>
            <div className="card-body">
                <h6 className="brand">{brand}</h6>
                <h4 className="title">{title}</h4>
                <h4 className="price"><span>{numToCurrency(price)}</span>{oldPrice && <>/<span className='oldPrice'>{numToCurrency(oldPrice)}</span></>}</h4>
                <p className="short-desc">{parse(truncateString(shortDesc, 120, true))}</p>
                {shipping && <h5 className="shipping">Free Shipping</h5>}
                <button className="add-card-btn"><svg class="card-icon" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" ><path d="M14.35 43.95q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55-1.05 1.05-2.55 1.05Zm20 0q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55-1.05 1.05-2.55 1.05Zm-22.6-33 5.5 11.4h14.4l6.25-11.4Zm-1.5-3H39.7q1.15 0 1.75 1.05.6 1.05 0 2.1L34.7 23.25q-.55.95-1.425 1.525t-1.925.575H16.2l-2.8 5.2h24.55v3h-24.1q-2.1 0-3.025-1.4-.925-1.4.025-3.15l3.2-5.9L6.45 7h-3.9V4H8.4Zm7 14.4h14.4Z"/></svg><span>Add to card</span></button>
            </div>
        </div>
    );
}

export default VerticalCard;

                