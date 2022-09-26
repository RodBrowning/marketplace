import './style.scss';
import './style-mobile.scss';

import { useEffect, useState } from 'react';

import AddCartButton from '../../components/button/addCart/addCartButton';
import DiscountDisplay from '../../components/display/discount';
import PriceDisplay from '../../components/display/price';
import { getPercentage } from '../../utils/utils';
import image from '../../a.jpg';
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    return params.id;
  }

const Product = () => {
    const id = useLoaderData();
    const brand = "Volvo";
    const title = "Constellation";
    const price = 23.050;
    const oldPrice = 35.738;
    const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro.";
    const shipping = true;

    const [discount, setDiscount] = useState(0);
    useEffect(() => {
        if (price && oldPrice !== undefined) {
            setDiscount(getPercentage(price, oldPrice));
        }
    }, [oldPrice, price]); 
    
    return (
        <section id='product-page'>
            <div className="product-container">
                <div className="product-image">
                    <DiscountDisplay discount={discount} />
                    <img src={image} alt="" />
                </div>
                <div className="product-description">
                    <h6 className="brand">{brand}</h6>
                    <h4 className="title">{title}</h4>
                    <PriceDisplay price={price} oldPrice={oldPrice}/>
                    <p className="description">{description}</p>
                    {shipping && <h6 className="shipping">Free Shipping</h6>}
                    <AddCartButton />
                </div>
            </div>
        </section>
    );
}
    
export default Product;
