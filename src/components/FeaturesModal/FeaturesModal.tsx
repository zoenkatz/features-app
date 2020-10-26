import React, {useCallback, useContext, useEffect, useState, useMemo} from 'react';
import FeaturesTable from '../FeaturesTable/FeaturesTable';
import FeatureButton from '../FeaturesButton/FeaturesButton';
import {fetchFeatures, fetchModelMetadata} from '../../lib/mock-api';
import {IColumnNode} from "../../lib/types";
import FeaturesFilters from "../FeaturesFilters/FeaturesFilters";
import './FeaturesModal.scss';
import FeaturesContext from "../../FeaturesContext";


const FeaturesModal = () => {
    const [featuresColumns, setFeaturesColumns] = useState<IColumnNode[]>([]);
    const {dispatch, query, featuresFlatData, featuresModelMetadata, filterByLabelValue, filterByDomainValue, isLoading} = useContext(FeaturesContext);

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers: number[] = [];
    const featuresPerPage = 3;
    const indexOfLastFeature = currentPage * featuresPerPage;
    const indexOfFirstFeature = indexOfLastFeature - featuresPerPage;

    for (let i = 1; i <= Math.ceil(featuresFlatData.length / featuresPerPage); i++) {
        pageNumbers.push(i);
    }

    const featuresColumnArr = useMemo(() => {
        return [
            {
                Header: 'NAME',
                accessor: 'name',
            },
            {
                Header: 'VARIABLE ID',
                accessor: 'varId',
            },
            {
                Header: 'DESCRIPTION',
                accessor: 'description',
            },
            {
                Header: 'DOMAINS',
                accessor: (originalRow: any, rowIndex: any) => originalRow.domains,
                Cell: (row: any) => {
                    console.log(row, "featuresModelMetadata")
                    return (
                    <select>
                        <option value="">{`${row.value.length} selected`}</option>
                        {featuresModelMetadata && featuresModelMetadata.domains.map((val, index) => {
                            return <option value={val} key={index}>{val}</option>;
                        })}
                    </select>
                )}
            },
            {
                Header: 'LABELS',
                accessor: 'labels',
                Cell: (row: any) => (
                    <select>
                        <option value="">{`${row.value.length} selected`}</option>
                        {featuresModelMetadata && featuresModelMetadata.labels.map((val, index) => {
                            return <option value={val} key={index}>{val}</option>;
                        })}
                    </select>
                )
            },
            {
                Header: 'VALUE',
                accessor: 'value',
            }
        ]

    }, [featuresModelMetadata.labels, featuresModelMetadata.domains]);

    const getFeaturesData = useCallback(() => {
        return fetchFeatures();
    }, []);

    const getModeMetadata = useCallback(() => {
        return fetchModelMetadata();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [featuresFlatData]);

    useEffect(() => {

        Promise.all([getFeaturesData(), getModeMetadata()]).then((res) => {
            if(res && Array.isArray(res[0]) && Object.keys(res[1])) {
                const featuresFlatData = res[0].map(item => {
                    return {
                        ...item,
                        ...item.attributes
                    }
                });
                dispatch({type: 'SET_FEATURES_DATA', payload: { featuresFlatData, featuresModelMetadata: res[1], isLoading: false }});
            }
        }).catch((err) => {
            console.log(err)
        });
    }, []);

    useEffect(() => {
        setFeaturesColumns(featuresColumnArr)

    }, [featuresFlatData, featuresModelMetadata]);

    const filterFeaturesData = useMemo(() => {
        return featuresFlatData && featuresFlatData.filter(feature => {
            console.log(feature, "feature")
            return ((feature.name && feature.name.toLowerCase().indexOf(query.toLowerCase()) > -1) || (feature.description && feature.description.toLowerCase().indexOf(query.toLowerCase()) > -1))
            && (feature.labels.includes(filterByLabelValue) || filterByLabelValue === '') && (feature.domains.includes(filterByDomainValue) || filterByDomainValue === '')
        }).slice(indexOfFirstFeature, indexOfLastFeature);
    }, [featuresFlatData, featuresModelMetadata, query, filterByLabelValue, filterByDomainValue, indexOfFirstFeature, indexOfLastFeature]);

    return useMemo(() => {

        return featuresFlatData && !!featuresFlatData.length ? (
            <div className="features-modal">
                <div onClick={() => {dispatch({type: 'SET_IS_DIALOG_OPEN',payload: {isDialogOpen: false}})}}>X</div>
                <div className="features-modal-table">
                    <FeaturesFilters />
                    <FeaturesTable columns={featuresColumns} data={filterFeaturesData} setCurrentPage={setCurrentPage} dispatch={dispatch} pageNumbers={pageNumbers} currentPage={currentPage}/>
                </div>
                <FeatureButton buttonValue='Save & Compute' onClickButton={() => {dispatch({type: 'SET_IS_DIALOG_OPEN',payload: {isDialogOpen: false}})}}/>
            </div> ): isLoading ? (
            <div>Loading...</div>
        ) : <div>No Data</div>
    },[dispatch, featuresColumns, filterFeaturesData, featuresFlatData, isLoading, setCurrentPage, pageNumbers, currentPage]);
};

export default FeaturesModal;
