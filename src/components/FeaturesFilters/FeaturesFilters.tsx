import React, {useCallback, useContext, useMemo} from 'react';
import FeaturesButton from '../FeaturesButton/FeaturesButton';
import FeaturesInput from '../FeaturesInput/FeaturesInput';
import FeaturesContext from "../../FeaturesContext";
import FeaturesSelect from "../FeaturesSelect/FeaturesSelect";

const FeaturesFilters = () => {
    const {dispatch, query, selectedRowIds, featuresModelMetadata, featuresFlatData} = useContext(FeaturesContext);
    console.log(selectedRowIds);
    const handleDeleteSelected = useCallback(() => {
        console.log(selectedRowIds, "delete");
        const remainingFeatureRows = featuresFlatData && featuresFlatData.filter((feature, index) => {
            return selectedRowIds && Object.keys(selectedRowIds).length && !selectedRowIds[index]
        });

       dispatch({type: 'SET_REMAINING_FEATURES', payload: {remainingFeatures: remainingFeatureRows}})
    }, [selectedRowIds, featuresFlatData]);

    const handleLabelFilter = useCallback((event) => {
        dispatch({type: 'SET_FILTER_LABEL_VALUE', payload: {filterByLabelValue: event.target.value}})
    }, []);

    const handleDomainFilter = useCallback((event) => {
        dispatch({type: 'SET_FILTER_DOMAIN_VALUE', payload: {filterByDomainValue: event.target.value}})
    }, []);

    const handleSearch = useCallback((event) => {
        dispatch({type: 'SET_SEARCH_QUERY', payload: {query: event.target.value}})
    }, []);

    return useMemo(() => {
        return (
            <div className="filters-row">
                <FeaturesButton onClickButton={handleDeleteSelected} buttonValue="DELETE SELECTED"/>
                <FeaturesInput inputName="search-features" inputType="search" inputOnChange={handleSearch} inputValue={query} inputPlaceholder="Search..."/>
                <FeaturesSelect selectName="filter-by-labels" selectValue="Filter by label" selectOnChange={handleLabelFilter} selectOptions={featuresModelMetadata.labels}/>
                <FeaturesSelect selectName="filter-by-domains" selectValue="Filter by domain" selectOnChange={handleDomainFilter} selectOptions={featuresModelMetadata.domains}/>
            </div>
        )
    }, [query, featuresModelMetadata, handleDeleteSelected])
};

export default FeaturesFilters;
