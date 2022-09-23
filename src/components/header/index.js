import './style.scss';
import './style-mobile.scss';

import { Link } from 'react-router-dom';

const Header = () => {
    
    function cartItems() {
        return []
    }
    
    return (
        <header>
            <div className="logo">
                <h3>90's Shop</h3>
            </div>
            <nav>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li>
                        <Link to={"/cart"}>
                            <span>
                                Cart ({cartItems().length})
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
        );
    }
    
export default Header;
