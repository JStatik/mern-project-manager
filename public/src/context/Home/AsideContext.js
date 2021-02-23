import React, { createContext, useCallback, useReducer } from 'react';
import asideReducer from '../../reducer/Home/asideReducer';
import types from '../../types/types';

const AsideContext = createContext();

const initialState = {
    projects: [],
    showProjectForm: false
};

const AsideProvider = ( { children } ) => {  
    const [ aside, dispatchAside ] = useReducer( asideReducer, initialState );
    const { projects, showProjectForm } = aside;

    const clearAsideContext = useCallback( () => {
        dispatchAside( {
            type: types.clearAsideContext
        } );
    }, [] );

    return (
        <AsideContext.Provider
            value={ {
                projects,
                showProjectForm,
                dispatchAside,
                clearAsideContext
            } }
        >
            { children }
        </AsideContext.Provider>
    );
};

export {
    AsideContext,
    AsideProvider
};
