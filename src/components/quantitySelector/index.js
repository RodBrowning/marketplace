import './style.scss';

import {useEffect, useRef} from 'react';

const QuantitySelector = ({quantity, handleChange, initialQuantity}) => {
    const selectRef = useRef(initialQuantity);

    useEffect(() => {
        selectRef.current.value = initialQuantity;
    }, [initialQuantity]);
    
    const handleChangeEvent = () => {
        handleChange(Number(selectRef.current.value));
    }

    const options = (numOfOptions) => {
        const options = [];
        for (let index = 1; index <= numOfOptions; index++) {
            const option = <option value={index} key={index} data-testid="option">{index}</option>;
            options.push(option);
        }
        return options;
    }
    
    return (
        <select ref={selectRef} value={selectRef.current.value} defaultValue={initialQuantity} id="quantity-selector" data-testid="select" onChange={handleChangeEvent}>
            {options(quantity)}
        </select>
    );
}

export default QuantitySelector;

                                