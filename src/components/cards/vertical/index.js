import './style.scss';
import './style-mobile.scss';

import { getPercentage, truncateString } from '../../../utils/utils';
import { useEffect, useState } from 'react';

import AddCartButton from '../../button/addCart/addCartButton';
import DiscountDisplay from '../../display/discount';
import PriceDisplay from '../../display/price';
import parse from 'html-react-parser';

const VerticalCard = ({brand, title, image, price, oldPrice, shortDesc, shipping}) => {
    const [discount, setDiscount] = useState(0)
    useEffect(() => {
        if (price && oldPrice !== undefined) {
            setDiscount(getPercentage(price, oldPrice));
        }
    }, [oldPrice, price]); 
    
    return (
        <div id="vertical-card">
            <div className="card-img">
                <DiscountDisplay discount={discount} />
                <img src={image} alt="" />
            </div>
            <div className="card-body">
                <h6 className="brand">{brand}</h6>
                <h4 className="title">{title}</h4>
                <PriceDisplay price={price} oldPrice={oldPrice}/>
                <p className="short-desc">{parse(truncateString(shortDesc, 120, true))}</p>
                {shipping && <h6 className="shipping">Free Shipping</h6>}
                <AddCartButton />
            </div>
        </div>
    );
}

export default VerticalCard;

                