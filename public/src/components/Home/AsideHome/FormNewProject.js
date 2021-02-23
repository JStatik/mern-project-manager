import React, { useContext, useEffect, useState } from 'react';
import { AsideContext } from '../../../context/Home/AsideContext';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { HomeContext } from '../../../context/Home/HomeContext';
import { MainContext } from '../../../context/Home/MainContext';
import useFetchToken from '../../../hooks/useFetchToken';
import useForm from '../../../hooks/useForm';
import isValidProject from '../../../helpers/isValidProject';
import ErrorForm from './FormNewProject/ErrorForm';
import InputForm from './FormNewProject/InputForm';
import SubmitButton from './FormNewProject/SubmitButton';
import types from '../../../types/types';

const FormNewProject = () => {
    const { startLogout } = useContext( AuthContext );
    const { clearMainContext } = useContext( MainContext );
    const { dispatchHome, clearHomeContext } = useContext( HomeContext );
    const { dispatchAside, clearAsideContext } = useContext( AsideContext );

    const [ formValues, handleChange, reset ] = useForm( { project: '' } );
    const { project } = formValues;

    const [ error, setError ] = useState( '' );

    const [ body, setBody ] = useState( null );
    const [ token, setToken ] = useState( null );
    const { dataAPI, loadingAPI, errorAPI } = useFetchToken( '/project/create', token, 'POST', body );

    useEffect( () => {
        if( dataAPI ) {
            dispatchHome( {
                type: types.hideFormTasks,
                payload: true
            } );

            dispatchHome( {
                type: types.addNewProjectHome,
                payload: dataAPI.project
            } );

            dispatchAside( {
                type: types.addNewProjectAside,
                payload: dataAPI.project
            } );
        }
    }, [ dataAPI, dispatchHome, dispatchAside ] );

    const handleSubmit = ( event ) => {
        event.preventDefault();
        
        setBody( null );
        setToken( null );

        const { isValid, errorProject, projectValidator } = isValidProject( project );
        setError( errorProject );
        
        if( isValid ) {
            reset();

            const getToken = JSON.parse( localStorage.getItem( 'upma' ) )?.token;

            if( getToken ) {
                setToken( getToken );
                setBody( { project: projectValidator } );
            } else {
                startLogout();
                clearHomeContext();
                clearAsideContext();
                clearMainContext();
            }
        }
    };

    return (
        <div className="row animate__animated animate__fadeIn">
            <div className="col-12">
                <form autoComplete="off" className="new-project" onSubmit={ handleSubmit }>
                    { errorAPI && <ErrorForm error={ errorAPI } /> }

                    { error && <ErrorForm error={ error } /> }

                    <InputForm
                        icon="fa-folder-plus"
                        name="project"
                        placeholder="New project"
                        type="text"
                        error={ error }
                        handleChange={ handleChange }
                        value={ project }
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

export default FormNewProject;
