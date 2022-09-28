import './style.scss';
import './style-mobile.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import HorizontalCard from '../../components/cards/horizontal';
import VerticalCard from '../../components/cards/vertical';
import { addToCart } from '../../features/cart/cartSlice';
import { getNewers } from '../../features/products/productsSlice';
import imgA from '../../a.jpg';
import { shuffleArray } from '../../utils/utils';

const Products = () => {
    const {products, newers} = useSelector((state) => state.products);
    const cartList = useSelector((state) => state.cart.list);
    const [newersProducts, setNewersProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        if(newers && newers.length > 0){
            const shuffledNewers = shuffleArray([...newers]);
            setNewersProducts(shuffledNewers.slice(0,2));
        }
    }, [newers])
    
    const isInTheCart = (product) => {
        return cartList.some((cartProduct)=>{return cartProduct.id == product.id}) 
    }
    
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    
    return (
        <>
            {newersProducts.length > 0 && 
                <section id="products-section">
                        <h1 className="section-title">Newest</h1>
                        <div className="products horizontal-cards">
                            {newersProducts.map((product) => {
                                return <HorizontalCard goToProductPage={() => {navigate(`/product/${product.id}`)}} key={product.id} brand={product.brand} title={product.title} image={product.imageURL} imageAlt={product.imageAlt} price={product.price.value}/>
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
                            return <VerticalCard goToProductPage={() => {navigate(`/product/${product.id}`)}} key={product.id} brand={product.brand} title={product.title} image={product.imageURL} imgAlt={product.imageAlt} price={product.price.value} oldPrice={product.price.OldValue} shortDesc={product.description} shipping={product.freeShipping} handleAddToCart={()=>{handleAddToCart(product)}} disabled={isInTheCart(product)}/>
                        })
                    }
                </div>
                </section>
            }
        </>
        );
    }
    
export default Products;
