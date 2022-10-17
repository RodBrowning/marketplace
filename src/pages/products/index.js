import './style.scss';
import './style-mobile.scss';

import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import HorizontalCard from '../../components/cards/horizontal';
import VerticalCard from '../../components/cards/vertical';
import { shuffleArray } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

let count = 0;
const Products = () => {
    const { products, loading, isSuccess, message } = useAppSelector((state) => state.products);
    const cartList = useAppSelector((state) => state.cart.list);
    const newest = products.filter((product) => {
        return product.newest === true;
    });
    const newestProducts = shuffleArray([...newest]).slice(0, 2);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isInTheCart = (product) => {
        return cartList.some((cartProduct) => { return cartProduct.id === product.id })
    }

    console.log("rendered products: ",count++);
    return (
        <>
            {loading && !isSuccess && <h1 className='loading-message'>{message}</h1>}
            {!loading && !isSuccess && <h1 className='error-message'>{message}</h1>}
            {newestProducts.length > 0 &&
                <section id="products-section">
                    <h1 className="section-title">Newest</h1>
                    <div className="products horizontal-cards" data-testid='Newest-container'>
                        {newestProducts.map((product) => {
                            return <HorizontalCard
                                key={product.id}
                                product={product}
                                goToProductPageHandler={() => { navigate(`/product/${product.id}`) }}
                            />
                        })}
                    </div>
                </section>
            }
            {products.length > 0 &&
                <section id="products-section">
                    <h1 className="section-title">90's Products</h1>
                    <div className="products vertical-cards" data-testid='products-container'>
                        {
                            products.map((product) => {
                                return <VerticalCard
                                    key={product.id}
                                    product={product}
                                    goToProductPageHandler={() => { navigate(`/product/${product.id}`) }}
                                    handleAddToCart={() => { dispatch(addToCart({ ...product })) }}
                                    handleRemoveFromCart={() => { dispatch(removeFromCart(product)) }}
                                    isInTheCart={isInTheCart(product)}
                                />
                            })
                        }
                    </div>
                </section>
            }
        </>
    );
};

export default Products;
