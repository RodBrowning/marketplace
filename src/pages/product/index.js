import './style.scss';
import './style-mobile.scss';

import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { getPercentage, numToCurrency } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import AddCartButton from '../../components/button/addCart/addCartButton';
import DiscountDisplay from '../../components/display/discount';
import PriceDisplay from '../../components/display/price';
import QuantitySelector from '../../components/quantitySelector';
import { setProd } from '../../features/products/productsSlice';
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    return params.id;
  }

const Product = () => {
    const id = useLoaderData();
    const {products, selectedProduct} = useSelector((state) => state.products);
    const [currentProduct, setCurrentProduct] = useState();
    const cartList = useSelector((state) => state.cart.list);
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isInTheCart, setIsInTheCart] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {dispatch(setProd(id))}, [dispatch, products, id]);
    useEffect(() => {setCurrentProduct(selectedProduct)}, [selectedProduct]);
   
    useEffect(() => {
        if (currentProduct && currentProduct.price.value && currentProduct.price.oldValue !== undefined) {
            setDiscount(getPercentage(currentProduct.price.value, currentProduct.price.oldValue));
        }
    }, [currentProduct]); 
    
    useEffect(() => {
        if(currentProduct && cartList && cartList.length > 0){
            const hasFoundInTheCart = cartList.some((cartProduct) => {return cartProduct.id == currentProduct.id})
            setIsInTheCart(hasFoundInTheCart);
            
            if(hasFoundInTheCart) {
                const cartProduct = cartList.find((cartProduct) => {return cartProduct.id == currentProduct.id})
                setQuantity(cartProduct.quantity)
            }
        }
    }, [cartList, currentProduct]); 
    
    const handleQuantityChange = (quantity) => {
        setQuantity(quantity)
        if(!isInTheCart) return
        
        dispatch(removeFromCart(currentProduct))
        const cartProduct = {...currentProduct, quantity};
        setCurrentProduct(cartProduct)
        dispatch(addToCart(cartProduct))
    }
    const handleAddToCart = () => {
        const cartProduct = {...currentProduct, quantity};
        setCurrentProduct(cartProduct)
        dispatch(addToCart(cartProduct))
    }

    const getTotalToPay = () => {
        let total = currentProduct.price.value * quantity;
        if(!currentProduct.freeShipping){
            total += currentProduct.price.shipping
        }
        return total;
    }
    
    return (
        <section id='product-page'>
            {currentProduct && 
                <div className="product-container">
                    <div className="product-image">
                        <DiscountDisplay discount={discount} />
                        <img src={currentProduct.imageURL} alt={currentProduct.imageAlt} />
                    </div>
                    <div className="product-description">
                        <h6 className="brand">{currentProduct.brand}</h6>
                        <h4 className="title">{currentProduct.title}</h4>
                        <PriceDisplay 
                            price={(currentProduct.price.value * quantity)} 
                            oldPrice={(currentProduct.price.oldValue && currentProduct.price.oldValue * quantity)}
                            currencyInfo={currentProduct.price.currencyInfo}
                        />
                        {!currentProduct.freeShipping && <p className='shipping-label'>Shipping <span>{numToCurrency(currentProduct.price.shipping, currentProduct.price.currencyInfo)}</span></p>}
                        
                        <p className='quantity'>Quantity</p>
                        <QuantitySelector 
                            quantity={currentProduct.quantityAvailable} 
                            initialQuantity={quantity} 
                            handleQuantityChange={handleQuantityChange}
                        />
                        <p className="description">{currentProduct.description}</p>
                        {currentProduct.freeShipping && <h6 className="shipping">Free Shipping</h6>}
                        
                        <p className='total-label'>Total: <span>{numToCurrency(getTotalToPay(), currentProduct.price.currencyInfo)}</span></p>
                        <AddCartButton 
                            buttonAction={handleAddToCart} 
                            disabled={isInTheCart}
                        />
                    </div>
                </div>
            }
        </section>
    );
}
    
export default Product;
