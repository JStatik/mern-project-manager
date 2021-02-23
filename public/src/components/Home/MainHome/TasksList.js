import React, { useContext, useEffect } from 'react';
import { AsideContext } from '../../../context/Home/AsideContext';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { HomeContext } from '../../../context/Home/HomeContext';
import { MainContext } from '../../../context/Home/MainContext';
import useFetchToken from '../../../hooks/useFetchToken';
import LoadingTasks from './TasksList/LoadingTasks';
import Task from './TasksList/Task';
import TitleList from './TasksList/TitleList';
import types from '../../../types/types';

const TasksList = () => {
    const { startLogout } = useContext( AuthContext );
    const { clearAsideContext } = useContext( AsideContext );
    const { tasks, dispatchMain, clearMainContext } = useContext( MainContext );
    const { activeProject, dispatchHome, clearHomeContext } = useContext( HomeContext );

    const user = JSON.parse( localStorage.getItem( 'upma' ) ); 
    const { dataAPI, loadingAPI, errorAPI } = useFetchToken( `/task/${ activeProject.id }`, user?.token, 'GET' );

    useEffect( () => {
        if( dataAPI ) {
            dispatchHome( {
                type: types.hideFormTasks,
                payload: false
            } );

            dispatchMain( {
                type: types.getAllTasks,
                payload: dataAPI.tasks
            } );
        }
    }, [ dataAPI, dispatchHome, dispatchMain ] );

    useEffect( () => {
        if( errorAPI || !user ) {
            startLogout();
            clearHomeContext();
            clearAsideContext();
            clearMainContext();
        }
    }, [ user, errorAPI, startLogout, clearHomeContext, clearAsideContext, clearMainContext ] );

    return (
        <div className="row mt-5">
            {
                loadingAPI
                    ?
                <LoadingTasks />
                    :
                <>
                    <TitleList />

                    {
                        tasks.map( task => (
                            <Task
                                key={ task.id }
                                task={ task }
                            />
                        ) )
                    }
                </>
            }
        </div>
    );
};

export default TasksList;
