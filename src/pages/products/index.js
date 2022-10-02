import './style.scss';
import './style-mobile.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { shuffleArray } from '../../utils/utils';

import HorizontalCard from '../../components/cards/horizontal';
import VerticalCard from '../../components/cards/vertical';

const Products = () => {
    const {products, newest, loading, isSuccess, message} = useSelector((state) => state.products);
    const cartList = useSelector((state) => state.cart.list);
    const [newestProducts, setNewestProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        if(newest && newest.length > 0){
            const shuffledNewest = shuffleArray([...newest]);
            setNewestProducts(shuffledNewest.slice(0,2));
        }
    }, [newest])
    
    const isInTheCart = (product) => {
        return cartList.some((cartProduct)=>{return cartProduct.id === product.id}) 
    }

    const handleAddToCart = (product) => {
        if(isInTheCart(product)){
            dispatch(removeFromCart({...product}));
        }
        dispatch(addToCart({...product}));
    }
    
    return (
        <>
            {!loading && !isSuccess && <h1 className='error-message'>{message}</h1>}
            {newestProducts.length > 0 && 
                <section id="products-section">
                        <h1 className="section-title">Newest</h1>
                        <div className="products horizontal-cards">
                            {newestProducts.map((product) => {
                                return <HorizontalCard 
                                    goToProductPage={() => {navigate(`/product/${product.id}`)}} 
                                    key={product.id} 
                                    brand={product.brand} 
                                    title={product.title} 
                                    image={product.imageURL} 
                                    imageAlt={product.imageAlt} 
                                    price={product.price.value}
                                    currencyInfo={product.price.currencyInfo}
                                />
                            })}
                        </div>
                </section>
            }
            {products.length > 0 &&
                <section id="products-section">
                    <h1 className="section-title">90's Products</h1>
                    <div className="products vertical-cards">
                        {
                            products.map((product) => {
                                return <VerticalCard 
                                    key={product.id} 
                                    brand={product.brand} 
                                    title={product.title} 
                                    image={product.imageURL} 
                                    imgAlt={product.imageAlt} 
                                    price={product.price.value} 
                                    oldPrice={product.price.oldValue} 
                                    currencyInfo={product.price.currencyInfo}
                                    shortDesc={product.description} 
                                    shipping={product.freeShipping} 
                                    goToProductPageHandler={() => {navigate(`/product/${product.id}`)}} 
                                    handleAddToCart={()=>{handleAddToCart(product)}} 
                                    handleRemoveToCart={()=>{dispatch(removeFromCart(product))}} 
                                    isInTheCart={isInTheCart(product)}
                                />
                            })
                        }
                    </div>
                </section>
            }
        </>
    );
}
    
export default Products;
