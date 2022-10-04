import './style.scss';

import {useEffect, useState} from 'react';

const getKey = () => {
    const randomNumber = Math.floor(Math.random() * 99999) + 10000;
    const dateInMilliseconds = new Date().getTime();
    return `${randomNumber}${dateInMilliseconds}`;
}

const QuantitySelector = ({quantity, handleChange, initialQuantity}) => {
    const [value, setValue] = useState(1);

    useEffect(() => {
        setValue(initialQuantity);
    }, [initialQuantity]);
    
    const handleChangeEvent = (value) => {
        setValue(value);
        handleChange(Number(value))
    }

    const options = (numOfOptions) => {
        const options = [];
        for (let index = 1; index <= numOfOptions; index++) {
            const option = <option value={index} key={getKey()} data-testid="option">{index}</option>;
            options.push(option);
        }
        return options;
    }
    
    return (
        <select id="quantity-selector" data-testid="select" onChange={(event) =>{handleChangeEvent(event.target.value)}} value={value}>
            {options(quantity)}
        </select>
    );
}

export default QuantitySelector;

                                