import './style.scss';

import {memo} from 'react';

const DiscountDisplay = ({ discount }) => {
    return (
        discount > 0 ? <div className="discount-flag"><p>-{discount}%</p></div> : ""
    );
}

export default memo(DiscountDisplay);
