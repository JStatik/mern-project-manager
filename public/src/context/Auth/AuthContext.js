import React, { createContext, useCallback, useReducer, useState } from 'react';
import useFetchToken from '../../hooks/useFetchToken';
import authReducer from '../../reducer/Auth/authReducer';
import types from '../../types/types';

const AuthContext = createContext();

const initialState = {
    checking: true,
    logged: false,
    name: null,
    uid: null
};

const AuthProvider = ( { children } ) => {
    const [ auth, dispatchAuth ] = useReducer( authReducer, initialState );
    const { checking, logged, name } = auth;

    const [ token, setToken ] = useState( null );
    const { dataAPI, loadingAPI, errorAPI } = useFetchToken( '/auth/renew', token, 'GET' );

    const startLogin = useCallback( ( dataAPI ) => {
        const { token, user } = dataAPI;

        localStorage.setItem( 'upma', JSON.stringify( { token } ) );

        dispatchAuth( {
            type: types.login,
            payload: {
                logged: true,
                name: user.name,
                uid: user.uid
            }
        } );
    }, [] );

    const startLogout = useCallback( () => {
        localStorage.removeItem( 'upma' );

        dispatchAuth( {
            type: types.logout
        } );
    }, [] );

    const startRegister = useCallback( ( dataAPI ) => {
        const { token, user } = dataAPI;

        localStorage.setItem( 'upma', JSON.stringify( { token } ) );

        dispatchAuth( {
            type: types.register,
            payload: {
                logged: true,
                name: user.name,
                uid: user.uid
            }
        } );
    }, [] );

    const verifyJWT = useCallback( () => {
        const user = JSON.parse( localStorage.getItem( 'upma' ) );

        if( !user?.token ) {
            dispatchAuth( {
                type: types.verifyJWT,
                payload: {
                    checking: false
                }
            } );
        } else {
            setToken( user.token );

            if( errorAPI ) {
                localStorage.removeItem( 'upma' );

                return dispatchAuth( {
                    type: types.verifyJWT,
                    payload: {
                        checking: loadingAPI
                    }
                } );
            }

            if( dataAPI ) {
                const { token, user } = dataAPI;

                localStorage.setItem( 'upma', JSON.stringify( { token } ) );

                return dispatchAuth( {
                    type: types.verifyJWT,
                    payload: {
                        checking: loadingAPI,
                        logged: true,
                        name: user.name,
                        uid: user.uid
                    }
                } );
            }
        }
    }, [ dataAPI, loadingAPI, errorAPI ] );

    return (
        <AuthContext.Provider
            value={ {
                checking,
                logged,
                name,
                startLogin,
                startLogout,
                startRegister,
                verifyJWT
            } }
        >
            { children }
        </AuthContext.Provider>
    );
};

export {
    AuthContext,
    AuthProvider
};
