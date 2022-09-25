import './style.scss';
import './style-mobile.scss';

import VerticalCard from '../../components/cards/vertical';

const Products = () => {
    
    return (
        <>
            <section id="products-section">
                <h1 className="section-title">Newest</h1>
                <div className="products">
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={false} />
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis porro adipisicing elit. Quidem blanditiis porro adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" price={105.5} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis porro adipisicing elit. Quidem blanditiis porro adipisicing elit. Quidem blanditiis porro." shipping={false} />
                </div>
            </section>
            <section id="products-section">
                <h1 className="section-title">90's Products</h1>
                <div className="products">
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                </div>
            </section>
        </>
        );
    }
    
export default Products;
