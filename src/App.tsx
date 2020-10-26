import React, {useContext, useReducer, useMemo} from 'react';
import FeaturesContext from './FeaturesContext';
import FeaturesReducer from './FeaturesReducer';
import './App.scss';
import FeaturesButton from './components/FeaturesButton/FeaturesButton';
import FeaturesModal from './components/FeaturesModal/FeaturesModal';



function App() {
    const initialState = useContext(FeaturesContext);
    const [state, dispatch] = useReducer(FeaturesReducer, initialState, undefined);


    return useMemo(() => {
        return (
            <FeaturesContext.Provider value={{ ...state, dispatch}}>
                <div className="App">
                    {!state.isDialogOpen ?
                        <FeaturesButton buttonValue="Features Table" onClickButton={() => {
                            dispatch({type: 'SET_IS_DIALOG_OPEN',payload: {isDialogOpen: true, isLoading: true}})
                        }}/>
                        : <FeaturesModal/>}
                </div>
            </FeaturesContext.Provider>
        );
    },[state, dispatch]);
}

export default App;
