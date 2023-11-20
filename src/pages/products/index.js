import './style.scss';
import './style-mobile.scss';

import HorizontalCard from '../../components/cards/horizontal';
import VerticalCard from '../../components/cards/vertical';
import { shuffleArray } from '../../utils/utils';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const { products, loading, isSuccess, message } = useAppSelector((state) => state.products);
    const newest = products.filter((product) => product.newest === true );
    const randomNewestProducts = shuffleArray([...newest]).slice(0, 2);
    
    return (
        <>
            {loading && !isSuccess && <h1 className='loading-message'>{message}</h1>}
            {!loading && !isSuccess && <h1 className='error-message'>{message}</h1>}
            {randomNewestProducts.length > 0 &&
                <section className="products-section">
                    <h1 className="section-title">Newest</h1>
                    <div className="products horizontal-cards" data-testid='Newest-container'>
                        {randomNewestProducts.map((product) => {
                            return (
                                <div key={product.id} onClick={()=>{navigate(`/product/${product.id}`)}} data-testid="horizontal-card-wrapper">
                                    <HorizontalCard product={product} />
                                </div>
                            );
                        })}
                    </div>
                </section>
            }
            {products.length > 0 &&
                <section className="products-section">
                    <h1 className="section-title">90's Products</h1>
                    <div className="products vertical-cards" data-testid='products-container'>
                        {
                            products.map((product) => {
                                return (
                                    <div key={product.id} onClick={()=>{navigate(`/product/${product.id}`)}} data-testid="vertical-card-wrapper">
                                        <VerticalCard product={product} />
                                    </div>
                                );
                            })
                        }
                    </div>
                </section>
            }
        </>
    );
};

export default Products;
