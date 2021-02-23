import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AsideContext } from '../../../../../context/Home/AsideContext';
import { AuthContext } from '../../../../../context/Auth/AuthContext';
import { HomeContext } from '../../../../../context/Home/HomeContext';
import { MainContext } from '../../../../../context/Home/MainContext';
import useFetchToken from '../../../../../hooks/useFetchToken';
import types from '../../../../../types/types';

const StateButton = ( { id, state } ) => {
    const { startLogout } = useContext( AuthContext );
    const { clearHomeContext } = useContext( HomeContext );
    const { clearAsideContext } = useContext( AsideContext );
    const { dispatchMain, clearMainContext } = useContext( MainContext );

    const [ token, setToken ] = useState( null );
    const { dataAPI, loadingAPI, errorAPI } = useFetchToken( `/task/update/state/${ id }`, token, 'PUT' );

    useEffect( () => {
        if( dataAPI ) {
            dispatchMain( {
                type: types.changeStateTask,
                payload: id
            } );

            setToken( null );
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
            {
                loadingAPI
                    &&
                <button
                    type="button"
                    className="btn btn-sm"
                    disabled={ loadingAPI }
                >
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                </button>
            }

            {
                ( !loadingAPI && state )
                    &&
                <button
                    type="button"
                    className="btn btn-sm btn-logout"
                    onClick={ handleClick }
                >
                    <i className="fas fa-times-circle"></i>
                </button>                        
            }

            {
                ( !loadingAPI && !state )
                    &&
                <button
                    type="button"
                    className="btn btn-sm btn-done"
                    onClick={ handleClick }
                >
                    <i className="fas fa-check"></i>
                </button>
            }
        </div>
    );
};

StateButton.propTypes = {
    id: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired
};

export default StateButton;
