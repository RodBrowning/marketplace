import './style.scss';
import './style-mobile.scss';

import { numToCurrency, truncateString } from '../../../utils/utils';
import { useEffect, useState } from 'react';

import AddCartButton from '../../button/addCart/addCartButton';
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
    }, [oldPrice, price]); 
    
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
                <AddCartButton />
            </div>
        </div>
    );
}

export default VerticalCard;

                