import React, { createContext, useCallback, useReducer, useRef } from 'react';
import { animateScroll } from 'react-scroll';
import mainReducer from '../../reducer/Home/mainReducer';
import types from '../../types/types';

const MainContext = createContext();

const initialState = {
    activeTask: {},
    showEditTaskModal: false,
    tasks: []
};

const MainProvider = ( { children } ) => {
    const containerTasks = useRef();

    const [ main, dispatchMain ] = useReducer( mainReducer, initialState );
    const { activeTask, showEditTaskModal, tasks } = main;

    const scrollBottom = useCallback( () => {
        const { scrollHeight, id } = containerTasks.current;

        animateScroll.scrollTo( 
            scrollHeight,    
            {
                containerId: id,
                duration: 0
            }
        );
    }, [] );

    const clearMainContext = useCallback( () => {
        dispatchMain( {
            type: types.clearMainContext
        } );
    }, [] );

    return (
        <MainContext.Provider
            value={ {
                containerTasks,
                scrollBottom,
                activeTask,
                showEditTaskModal,
                tasks,
                dispatchMain,
                clearMainContext
            } }
        >
            { children }
        </MainContext.Provider>
    );
};

export {
    MainContext,
    MainProvider
};
