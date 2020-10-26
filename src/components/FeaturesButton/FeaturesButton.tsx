import React, {useMemo} from 'react';
import './FeaturesButton.scss';

interface IProps {
    buttonValue: string;
    onClickButton: any;
}


const FeaturesButton = ({buttonValue, onClickButton}: IProps) => {
    return useMemo(() => {
        return (
            <button onClick={onClickButton}>{buttonValue}</button>
        )
    }, [onClickButton, buttonValue])
};

export default FeaturesButton;
