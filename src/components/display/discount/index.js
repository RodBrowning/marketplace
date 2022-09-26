import './style.scss';

const DiscountDisplay = ({discount}) => {
    return (
        discount > 0 ? <div className="discount-flag"><p>-{discount}%</p></div> : ""
    );
}

export default DiscountDisplay;
