import React, { useContext, useEffect, useState } from 'react';
import { AsideContext } from '../../../../context/Home/AsideContext';
import { AuthContext } from '../../../../context/Auth/AuthContext';
import { HomeContext } from '../../../../context/Home/HomeContext';
import { MainContext } from '../../../../context/Home/MainContext';
import useFetchToken from '../../../../hooks/useFetchToken';
import types from '../../../../types/types';

const ButtonDeleteProject = () => {
    const { startLogout } = useContext( AuthContext );
    const { clearMainContext } = useContext( MainContext );
    const { dispatchAside, clearAsideContext } = useContext( AsideContext );
    const { activeProject, dispatchHome, clearHomeContext } = useContext( HomeContext );
    const { id: projectId } = activeProject;

    const [ token, setToken ] = useState( null );
    const { dataAPI, loadingAPI, errorAPI } = useFetchToken( `/project/delete/${ projectId }`, token, 'DELETE' );

    useEffect( () => {
        if( dataAPI ) {
            dispatchAside( {
                type: types.deleteProjectAside,
                payload: projectId
            } );
    
            dispatchHome( {
                type: types.deleteProjectHome
            } );
        }
    }, [ projectId, dataAPI, dispatchAside, dispatchHome ] );

    useEffect( () => {
        if( errorAPI ) {
            startLogout();
            clearHomeContext();
            clearAsideContext();
            clearMainContext();
        }
    }, [ errorAPI, startLogout, clearHomeContext, clearAsideContext, clearMainContext ] );

    const handleClick = () => {
        const getToken = JSON.parse( localStorage.getItem( 'upma' ) )?.token;

        if( getToken ) {
            setToken( getToken );
        } else {
            startLogout();
            clearHomeContext();
            clearAsideContext();
            clearMainContext();
        }
    };

    return (
        <div className="col-12 text-center">
            <button
                type="button"
                className="btn"
                disabled={ loadingAPI }
                onClick={ handleClick }
            >
                {
                    !loadingAPI
                        ?
                    'Delete'
                        :
                    <>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden" style={ { marginLeft: '4px' } }>
                            Loading...
                        </span>
                    </>
                }
            </button>
        </div>
    );
};

export default ButtonDeleteProject;
