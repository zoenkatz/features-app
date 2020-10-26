import {createContext} from 'react';
import {ICrFlatNode, IModelMetadata} from "./lib/types";

interface IState {
    featuresFlatData: ICrFlatNode[],
    featuresModelMetadata: IModelMetadata,
    isDialogOpen: boolean;
    query: string,
    selectedRowIds: any,
    filterByLabelValue: string,
    filterByDomainValue: string,
    isLoading: boolean,
    dispatch: any
}

const appState: IState = {
    featuresFlatData: [],
    featuresModelMetadata: {labels: [], domains: []},
    isDialogOpen: false,
    query: '',
    filterByLabelValue: '',
    filterByDomainValue: '',
    selectedRowIds: undefined,
    isLoading: false,
    dispatch: () => {}
};


const FeaturesContext = createContext<IState>({
    ...appState
});

export default FeaturesContext;
