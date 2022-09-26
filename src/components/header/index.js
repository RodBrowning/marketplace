import './style.scss';
import './style-mobile.scss';

import { NavLink } from 'react-router-dom';

const Header = () => {
    
    function cartItems() {
        return []
    }
    
    return (
        <header id="header">
            <div className="logo">
                <NavLink to={"/"} end>
                    <h2>90's Shop</h2>
                </NavLink>
            </div>
            <nav>
                <ul>
                    <li><NavLink to={"/"} end>Home</NavLink></li>
                    <li>
                        <NavLink to={"cart"} end>
                            <span className='cart-btn' data-cart-items={6}>
                                <p className="num-itens">1</p>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48"><path d="M14.35 43.95q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55-1.05 1.05-2.55 1.05Zm20 0q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.05 1.05 1.05 1.05 2.55 0 1.5-1.05 2.55-1.05 1.05-2.55 1.05Zm-22.6-33 5.5 11.4h14.4l6.25-11.4Zm-1.5-3H39.7q1.15 0 1.75 1.05.6 1.05 0 2.1L34.7 23.25q-.55.95-1.425 1.525t-1.925.575H16.2l-2.8 5.2h24.55v3h-24.1q-2.1 0-3.025-1.4-.925-1.4.025-3.15l3.2-5.9L6.45 7h-3.9V4H8.4Zm7 14.4h14.4Z"/>
                                </svg>
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        );
    }
    
export default Header;
