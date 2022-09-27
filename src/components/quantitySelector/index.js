import './style.scss';

const getKey = () => {
    const randomNumber = Math.floor(Math.random() * 999) + 100;
    const dateInMilliseconds = new Date().getTime();
    return `${randomNumber}-${dateInMilliseconds}`;
}

const QuantitySelector = ({quantity}) => {
    const options = (numOfOptions) => {
        const options = [];
        for (let index = 1; index <= numOfOptions; index++) {
            const option = <option value={index} key={getKey()}>{index}</option>;
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

                                