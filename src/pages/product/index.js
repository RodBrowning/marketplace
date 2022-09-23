import './style.scss';
import './style-mobile.scss';

import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    return params.id;
  }

const Product = () => {
    const id = useLoaderData();
    console.log(id);
    return (
        <section>
            <h1>Product {id}</h1>
        </section>
        );
    }
    
export default Product;
