import './style.scss';
import './style-mobile.scss';

const RemoveCartShortButton = ({buttonAction}) => {
    const handleClick = (event) => {
        event.stopPropagation()
        buttonAction();
    }
    return (
        <button className="remove-card-short-btn" onClick={handleClick} data-testid="remove-from-cart">
            <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48">
                <path xmlns="http://www.w3.org/2000/svg" d="M32 25.4h-1.75l-2.95-3h4.25l6.3-11.4H15.8l-3-3h26.45q1.3 0 1.9 1.075.6 1.075-.1 2.325L34 24.2q-.3.55-.75.875-.45.325-1.25.325ZM14.35 43.95q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55-1.05 1.05-2.55 1.05Zm28.2 2.3-12.8-12.7h-15.9q-1.9 0-2.8-1.375-.9-1.375.05-2.975l3.5-5.85L10.3 14l-8-8 2.15-2.15L44.7 44.1Zm-15.8-15.7-5.05-5.2h-4.75l-3.15 5.2Zm4.8-8.15H27.3h4.25Zm2.85 21.55q-1.45 0-2.525-1.05T30.8 40.35q0-1.5 1.075-2.55 1.075-1.05 2.525-1.05t2.525 1.05Q38 38.85 38 40.35q0 1.5-1.075 2.55-1.075 1.05-2.525 1.05Z"/>
            </svg>
        </button>
    )
}

export default RemoveCartShortButton;