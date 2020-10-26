import React, {useMemo} from 'react';
import './FeaturesInput.scss';

interface IInputProps {
    inputType: string,
    inputName: string,
    inputValue: string,
    inputPlaceholder: string,
    inputOnChange: any
}


const FeaturesInput = ({inputType, inputName, inputOnChange, inputValue, inputPlaceholder}: IInputProps) => {
    return useMemo(() => {
        return (
            <input onChange={inputOnChange} name={inputName} type={inputType} value={inputValue} placeholder={inputPlaceholder}/>
        )
    }, [inputOnChange, inputType, inputName, inputValue, inputPlaceholder])
};

export default FeaturesInput;
