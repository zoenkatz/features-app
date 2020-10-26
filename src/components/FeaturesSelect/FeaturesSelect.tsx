import React, {useMemo} from 'react';

interface ISelectProps {
    selectName: string,
    selectValue: string,
    selectPlaceholder?: string,
    selectOnChange: any,
    selectOptions: any[]
}


const FeaturesSelect = ({selectValue, selectName, selectOnChange, selectOptions, selectPlaceholder}: ISelectProps) => {
    return useMemo(() => {
        return (
            <select name={selectName} onChange={selectOnChange} placeholder={selectPlaceholder}>
                {selectValue && <option value="">{selectValue}</option>}
                {selectOptions && selectOptions.map((val, index) => {
                    return <option value={val} key={index}>{val}</option>;
                })}
            </select>
        )
    }, [selectValue, selectName, selectOnChange, selectOptions, selectPlaceholder])
};

export default FeaturesSelect;
