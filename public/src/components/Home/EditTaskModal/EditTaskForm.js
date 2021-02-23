import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AsideContext } from '../../../context/Home/AsideContext';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { HomeContext } from '../../../context/Home/HomeContext';
import { MainContext } from '../../../context/Home/MainContext';
import useFetchToken from '../../../hooks/useFetchToken';
import useForm from '../../../hooks/useForm';
import isValidTask from '../../../helpers/isValidTask';
import ErrorForm from './EditTaskForm/ErrorForm';
import InputForm from './EditTaskForm/InputForm';
import SubmitButton from './EditTaskForm/SubmitButton';
import types from '../../../types/types';

const EditTaskForm = () => {
    const { startLogout } = useContext( AuthContext );
    const { clearHomeContext } = useContext( HomeContext );
    const { clearAsideContext } = useContext( AsideContext );
    const { activeTask, dispatchMain, clearMainContext } = useContext( MainContext );
    const { id: idTask, task: nameTask } = activeTask;

    const [ formValues, handleChange, reset ] = useForm( { task: nameTask } );
    const { task } = formValues;

    const [ error, setError ] = useState( '' );

    const [ body, setBody ] = useState( null );
    const [ token, setToken ] = useState( null );
    const { dataAPI, loadingAPI, errorAPI } = useFetchToken( `/task/update/name/${ idTask }`, token, 'PUT', body );

    useEffect( () => {
        if( dataAPI ) {
            dispatchMain( {
                type: types.editTask,
                payload: dataAPI.task
            } );
        }
    }, [ dataAPI, dispatchMain ] );

    const handleSubmit = ( event ) => {
        event.preventDefault();

        setBody( null );
        setToken( null );

        const { isValid, errorTask, taskValidator } = isValidTask( task );
        setError( errorTask );

        if( isValid ) {
            reset( { task: '' } );

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
        <Modal.Body>
            <div className="row">
                <div className="col-12">
                    <form autoComplete="off" className="task" onSubmit={ handleSubmit }>
                        { errorAPI && <ErrorForm error={ errorAPI } /> }

                        { error && <ErrorForm error={ error } /> }

                        <InputForm
                            icon="fa-tasks"
                            name="task"
                            placeholder="Edit task"
                            type="text"
                            error={ error }
                            handleChange={ handleChange }
                            value={ task }
                        />

                        <SubmitButton
                            loading={ loadingAPI }
                            text="Edit"
                        />
                    </form>
                </div>
            </div>
        </Modal.Body>
    );
};

export default EditTaskForm;
