import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AsideContext } from '../../../../../context/Home/AsideContext';
import { AuthContext } from '../../../../../context/Auth/AuthContext';
import { HomeContext } from '../../../../../context/Home/HomeContext';
import { MainContext } from '../../../../../context/Home/MainContext';
import useFetchToken from '../../../../../hooks/useFetchToken';
import types from '../../../../../types/types';

const DeleteButton = ( { id } ) => {
    const { startLogout } = useContext( AuthContext );
    const { clearHomeContext } = useContext( HomeContext );
    const { clearAsideContext } = useContext( AsideContext );
    const { dispatchMain, clearMainContext } = useContext( MainContext );

    const [ token, setToken ] = useState( null );
    const { dataAPI, loadingAPI, errorAPI } = useFetchToken( `/task/delete/${ id }`, token, 'DELETE' );

    useEffect( () => {
        if( dataAPI ) {
            dispatchMain( {
                type: types.deleteTaskMain,
                payload: id
            } );
        }
    }, [ id, dataAPI, dispatchMain ] );

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
        <div className="col-4 col-sm-4 col-md-1 p-0">
            <button
                type="button"
                className="btn btn-sm btn-delete-task"
                onClick={ handleClick }
                disabled={ loadingAPI }
            >
                {
                    !loadingAPI
                        ?
                    <i className="fas fa-trash"></i>
                        :
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                }
            </button>
        </div>
    );
};

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired
};

export default DeleteButton;
