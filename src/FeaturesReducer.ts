interface IPayload {
    isDialogOpen: boolean,
    query: string
}

interface IAction{
    type: string,
    payload: any
}


export default function FeaturesReducer (state: any, action: IAction){
    const actionPayload = action.payload;
    switch(action.type) {
        case 'SET_FEATURES_DATA':
            return {
                ...state,
                featuresFlatData: actionPayload.featuresFlatData,
                featuresModelMetadata: actionPayload.featuresModelMetadata,
                isLoading: actionPayload.isLoading

            };
        case 'SET_IS_DIALOG_OPEN':
            return {
                ...state,
                isDialogOpen: actionPayload.isDialogOpen,
                isLoading: actionPayload.isLoading
            };
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                query: actionPayload.query
            };
        case 'SET_SELECTED_ROW_IDS':
            return {
              ...state,
                selectedRowIds: actionPayload.selectedRowIds
            };
        case 'SET_REMAINING_FEATURES':
            return {
                ...state,
                featuresFlatData: actionPayload.remainingFeatures
            };
        case 'SET_FILTER_LABEL_VALUE':
            return {
                ...state,
                filterByLabelValue: actionPayload.filterByLabelValue
            };
        case 'SET_FILTER_DOMAIN_VALUE':
            return {
                ...state,
                filterByDomainValue: actionPayload.filterByDomainValue
            };

        default:
            return state;
    }
};
