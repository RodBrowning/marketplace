import './style.scss';
import './style-mobile.scss';

import { useEffect, useState } from 'react';
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { setSelectedProduct } from '../../features/products/productsSlice';
import { getPercentage, numToCurrency } from '../../utils/utils';

import AddCartButton from '../../components/button/addCart/addCartButton';
import DiscountDisplay from '../../components/display/discount';
import PriceDisplay from '../../components/display/price';
import QuantitySelector from '../../components/quantitySelector';
import RemoveCartButton from '../../components/button/removeCart/removeCartButton';

export async function loader({ params }) {
    return params.id;
  }

const Product = () => {
    const id = useLoaderData();
    const {products, selectedProduct} = useSelector((state) => state.products);
    const cartList = useSelector((state) => state.cart.list);
    const dispatch = useDispatch();

    const [currentProduct, setCurrentProduct] = useState();
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isInTheCart, setIsInTheCart] = useState(false);

    useEffect(() => {dispatch(setSelectedProduct(id))}, [dispatch, products, id]);

    useEffect(() => {setCurrentProduct(selectedProduct)}, [selectedProduct]);

    useEffect(() => {
        if (currentProduct && currentProduct.price.value && currentProduct.price.oldValue !== undefined) {
            setDiscount(getPercentage(currentProduct.price.value, currentProduct.price.oldValue));
        }
    }, [currentProduct]);

    useEffect(() => {
        if(currentProduct && cartList && cartList.length > 0){
            const wasItFoundInTheCart = cartList.some((cartProduct) => {return cartProduct.id === currentProduct.id})
            setIsInTheCart(wasItFoundInTheCart);
            
            if(wasItFoundInTheCart) {
                const cartProduct = cartList.find((cartProduct) => {return cartProduct.id === currentProduct.id})
                setQuantity(cartProduct.quantity)
            }
        }
    }, [cartList, currentProduct]);
    
    const handleQuantityChange = (quantity) => {
        setQuantity(quantity);
        if(!isInTheCart) return;
        
        dispatch(removeFromCart(currentProduct));
        setCurrentProduct(currentProduct);
        dispatch(addToCart({...currentProduct, quantity}));
    }

    const handleAddToCart = () => {
        isInTheCart && dispatch(removeFromCart(currentProduct));
        const product = {...currentProduct, quantity};
        setCurrentProduct(product);
        dispatch(addToCart(product));
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(currentProduct));
        setIsInTheCart(false);
    }

    const getTotalToPay = () => {
        let total = currentProduct.price.value * quantity;
        if(!currentProduct.freeShipping){
            total += currentProduct.price.shipping;
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
                        {!currentProduct.freeShipping && <p className='shipping-label'>Shipping: <span>{numToCurrency(currentProduct.price.shipping, currentProduct.price.currencyInfo)}</span></p>}
                        
                        <p className='quantity'>Quantity</p>
                        <QuantitySelector 
                            quantity={currentProduct.availableQuantity} 
                            initialQuantity={quantity} 
                            handleQuantityChange={handleQuantityChange}
                        />
                        <p className="description">{currentProduct.description}</p>
                        {currentProduct.freeShipping && <h6 className="shipping">Free Shipping</h6>}
                        
                        <p className='total-label'>Total: <span>{numToCurrency(getTotalToPay(), currentProduct.price.currencyInfo)}</span></p>
                        {!isInTheCart && 
                        <AddCartButton 
                            buttonAction={handleAddToCart} 
                            disabled={isInTheCart}
                        />}
                        {isInTheCart && 
                        <RemoveCartButton 
                            buttonAction={handleRemoveFromCart} 
                            disabled={isInTheCart}
                        />
                        }
                    </div>
                </div>
            }
        </section>
    );
}
    
export default Product;
