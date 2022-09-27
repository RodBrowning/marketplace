import './style.scss';

const QuantitySelector = ({quantity}) => {
    const options = (numOfOptions) => {
        const options = [];
        for (let index = 1; index <= numOfOptions; index++) {
            const option = <option value={index}>{index}</option>;
            options.push(option);
        }
        return options;
    }
    return (
        <select id="quantity-selector">
            {options(quantity)}
        </select>
    );
}

export default QuantitySelector;

                                