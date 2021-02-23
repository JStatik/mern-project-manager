import React, { createContext, useCallback, useReducer } from 'react';
import homeReducer from '../../reducer/Home/homeReducer';
import types from '../../types/types';

const HomeContext = createContext();

const initialState = {
    showMain: false,
    showSelectProject: true,
    toggleDeleteProjectModal: false,
    activeProject: {},
    hideFormTasks: false
};

const HomeProvider = ( { children } ) => {
    const [ home, dispatchHome ] = useReducer( homeReducer, initialState );
    const { showMain, showSelectProject, toggleDeleteProjectModal, activeProject, hideFormTasks } = home;

    const clearHomeContext = useCallback( () => {
        dispatchHome( {
            type: types.clearHomeContext
        } );
    }, [] );

    return (
        <HomeContext.Provider
            value={ {
                showMain,
                showSelectProject,
                toggleDeleteProjectModal,
                activeProject,
                hideFormTasks,
                dispatchHome,
                clearHomeContext
            } }
        >
            { children }
        </HomeContext.Provider>
    );
};

export {
    HomeContext,
    HomeProvider
};
