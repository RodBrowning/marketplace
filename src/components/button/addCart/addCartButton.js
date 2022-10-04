import './style.scss';
import './style-mobile.scss';

const AddCartButton = ({buttonAction, disabled}) => {
    const handleClick = (event) => {
        event.stopPropagation()
        buttonAction();
    }
    return (
        <button id={"add-card-btn"} className={disabled ? "disabled": ""} onClick={(event)=>{handleClick(event)}}><svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48"><path d="M23.25 17.35V11.2h-6.2v-3h6.2V2.05h3V8.2h6.15v3h-6.15v6.15ZM14.5 44q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55Q13 36.8 14.5 36.8q1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55Q16 44 14.5 44Zm20.2 0q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55Q36.2 44 34.7 44ZM14.5 33.65q-2.1 0-3.075-1.7-.975-1.7.025-3.45l3.05-5.55L7 7H3.1V4h5.8l8.5 18.2H32l7.8-14 2.6 1.4-7.65 13.85q-.45.85-1.225 1.3-.775.45-1.825.45h-15l-3.1 5.45h24.7v3Z"/></svg><span>Add to cart</span></button>
    )
}

export default AddCartButton;