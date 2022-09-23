import './syle.scss';
import './style-mobile.scss';

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
                    <li><a href="/">Home</a></li>
                    <li>
                        <a href="/cart">
                            <span>
                                Cart ({cartItems().length})
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
        );
    }
    
export default Header;
