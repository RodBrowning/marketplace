import './style.scss';

import { numToCurrency } from '../../../utils/utils';

const PriceDisplay = ({price, oldPrice, currencyInfo}) => {
    return (
        <h4 id="price-display"><span>{numToCurrency(price, currencyInfo)}</span>{oldPrice && <>/<span className='oldPrice'>{numToCurrency(oldPrice, currencyInfo)}</span></>}</h4>
    );
}

export default PriceDisplay;
