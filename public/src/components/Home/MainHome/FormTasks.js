import React, { useContext, useEffect, useState } from 'react';
import { AsideContext } from '../../../context/Home/AsideContext';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { HomeContext } from '../../../context/Home/HomeContext';
import { MainContext } from '../../../context/Home/MainContext';
import useFetchToken from '../../../hooks/useFetchToken';
import useForm from '../../../hooks/useForm';
import isValidTask from '../../../helpers/isValidTask';
import ErrorForm from './FormTasks/ErrorForm';
import InputForm from './FormTasks/InputForm';
import SubmitButton from './FormTasks/SubmitButton';
import types from '../../../types/types';

const FormTasks = () => {
    const { startLogout } = useContext( AuthContext );
    const { clearAsideContext } = useContext( AsideContext );
    const { activeProject, clearHomeContext } = useContext( HomeContext );
    const { scrollBottom, dispatchMain, clearMainContext } = useContext( MainContext );

    const [ formValues, handleChange, reset ] = useForm( { task: '' } );
    const { task } = formValues;

    const [ error, setError ] = useState( '' );

    const [ body, setBody ] = useState( null );
    const [ token, setToken ] = useState( null );
    const { dataAPI, loadingAPI, errorAPI } = useFetchToken( `/task/create/${ activeProject.id }`, token, 'POST', body );

    useEffect( () => {
        if( dataAPI ) {
            dispatchMain( {
                type: types.addNewTaskMain,
                payload: dataAPI.task
            } );

            setBody( null );
            setToken( null );

            scrollBottom();
        }
    }, [ dataAPI, scrollBottom, dispatchMain ] );

    const handleSubmit = ( event ) => {
        event.preventDefault();

        setBody( null );
        setToken( null );

        const { isValid, errorTask, taskValidator } = isValidTask( task );
        setError( errorTask );

        if( isValid ) {
            reset();

            const getToken = JSON.parse( localStorage.getItem( 'upma' ) )?.token;

            if( getToken ) {
                setToken( getToken );
                setBody( { task: taskValidator } );
            } else {
                startLogout();
                clearHomeContext();
                clearAsideContext();
                clearMainContext();
            }
        }
    };

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <form autoComplete="off" className="task" onSubmit={ handleSubmit }>
                    { errorAPI && <ErrorForm error={ errorAPI } /> }

                    { error && <ErrorForm error={ error } /> }

                    <InputForm
                        icon="fa-tasks"
                        name="task"
                        placeholder="New task"
                        type="text"
                        error={ error }
                        handleChange={ handleChange }
                        value={ task }
                    />

                    <SubmitButton
                        loading={ loadingAPI }
                        text="Create"
                    />
                </form>
            </div>
        </div>
    );
};

export default FormTasks;
