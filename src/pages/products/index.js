import './style.scss';
import './style-mobile.scss';

import HorizontalCard from '../../components/cards/horizontal';
import VerticalCard from '../../components/cards/vertical';
import imgA from '../../a.jpg';

const Products = () => {
    
    return (
        <>
            <section id="products-section">
                <h1 className="section-title">Newest</h1>
                <div className="products horizontal-cards">
                    <HorizontalCard brand="Ford" title="Mustang" image={imgA} price={1.5} />
                    <HorizontalCard brand="Ford" title="Mustang" image={imgA} price={1.5} />
                </div>
            </section>
            <section id="products-section">
                <h1 className="section-title">90's Products</h1>
                <div className="products">
                    <VerticalCard brand="Ford" title="Mustang" image={imgA} price={15} oldPrice={18} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" image={imgA} price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={false} />
                    <VerticalCard brand="Ford" title="Mustang" image={imgA} price={1.5} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={false} />
                    <VerticalCard brand="Ford" title="Mustang" image={imgA} price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" image={imgA} price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" image={imgA} price={1.5} oldPrice={6} shortDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" image={imgA} price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                    <VerticalCard brand="Ford" title="Mustang" image={imgA} price={1.5} oldPrice={6} shortDesc="orem ipsum dolor sit amet consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis consectetur adipisicing elit. Quidem blanditiis porro." shipping={true} />
                </div>
            </section>
        </>
        );
    }
    
export default Products;
