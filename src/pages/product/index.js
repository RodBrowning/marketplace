import './style.scss';
import './style-mobile.scss';

import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { getPercentage, numToCurrency } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';

import AddCartButton from '../../components/button/addCart/addCartButton';
import DiscountDisplay from '../../components/display/discount';
import PriceDisplay from '../../components/display/price';
import QuantitySelector from '../../components/quantitySelector';
import RemoveCartButton from '../../components/button/removeCart/removeCartButton';
import { useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    const { products } = useAppSelector((state) => state.products);
    const cartList = useAppSelector((state) => state.cart.list);
    const dispatch = useAppDispatch();

    const [currentProduct, setCurrentProduct] = useState();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const [selectedProduct] = products.filter((product) => {
            return product.id === Number(id);
        });
        setCurrentProduct(selectedProduct);
    }, [id, products]);

    useEffect(() => {
        if(currentProduct){
            const isInTheCart = cartList.some((cartProduct) => {return cartProduct.id === currentProduct.id});
            if(isInTheCart) {
                const cartProduct = cartList.find((cartProduct) => {return cartProduct.id === currentProduct.id});
                setQuantity(cartProduct.quantity);
            }
        }
    }, [cartList, currentProduct]);
    
    const handleQuantityChange = (quantity) => {
        setQuantity(quantity);
        const isInTheCart = cartList.some((cartProduct) => {return cartProduct.id === currentProduct.id})
        if(!isInTheCart) return;
        
        dispatch(removeFromCart(currentProduct));
        dispatch(addToCart({...currentProduct, quantity}));
    }

    const handleAddToCart = () => {
        const product = {...currentProduct, quantity};
        dispatch(addToCart(product));
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(currentProduct));
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
                        <DiscountDisplay discount={getPercentage(currentProduct.price.value, currentProduct.price.oldValue)} />
                        <img src={currentProduct.imageURL} alt={currentProduct.imageAlt} />
                    </div>
                    <div className="product-description">
                        <h6 className="brand">{currentProduct.brand}</h6>
                        <h2 className="title">{currentProduct.title}</h2>
                        <PriceDisplay 
                            price={(currentProduct.price.value * quantity)} 
                            oldPrice={(currentProduct.price.oldValue && currentProduct.price.oldValue * quantity)}
                            currencyInfo={currentProduct.price.currencyInfo}
                        />
                        {!currentProduct.freeShipping && <p className='shipping-label'>Shipping: <span data-testid='shipping-cost'>{numToCurrency(currentProduct.price.shipping, currentProduct.price.currencyInfo)}</span></p>}
                        
                        <p className='quantity'>Quantity</p>
                        <QuantitySelector 
                            quantity={currentProduct.availableQuantity} 
                            initialQuantity={quantity} 
                            handleChange={(quantity)=>{handleQuantityChange(quantity)}}
                        />
                        <p className="description">{currentProduct.description}</p>
                        {currentProduct.freeShipping && <h6 className="shipping">Free Shipping</h6>}
                        
                        <p className='total-label'>Total: <span data-testid='total'>{numToCurrency(getTotalToPay(), currentProduct.price.currencyInfo)}</span></p>
                        
                        {cartList.some((cartProduct) => {return cartProduct.id === currentProduct.id}) ?  
                            <RemoveCartButton 
                                buttonAction={handleRemoveFromCart}
                            /> : 
                            <AddCartButton 
                                buttonAction={handleAddToCart}
                            />
                        }
                    </div>
                </div>
            }
        </section>
    );
};
    
export default Product;
