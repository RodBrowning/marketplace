import './style.scss';

import { numToCurrency } from '../../../utils/utils';

const PriceDisplay = ({price, oldPrice}) => {
    return (
        <h4 id="price-display"><span>{numToCurrency(price)}</span>{oldPrice && <>/<span className='oldPrice'>{numToCurrency(oldPrice)}</span></>}</h4>
    );
}

export default PriceDisplay;
