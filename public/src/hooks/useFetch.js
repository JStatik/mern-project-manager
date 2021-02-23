import { useEffect, useRef, useState } from 'react';
import fetchAuth from '../helpers/fetchAuth';

const useFetch = ( endpoint, body ) => {
    const isMountedRef = useRef( true );
    const [ state, setState ] = useState( { dataAPI: null, loadingAPI: false, errorAPI: null } );

    useEffect( () => {
        return () => {
            isMountedRef.current = false;
        };
    }, [] );

    useEffect( () => {
        if( body ) {
            setState( { dataAPI: null, loadingAPI: true, errorAPI: null } );

            const executeRequest = async() => {
                try{
                    const { response } = await fetchAuth( endpoint, body );
                    const { ok } = response;

                    if( !ok ) {
                        if( isMountedRef.current && response.errors ) {
                            setState( {
                                dataAPI: null,
                                loadingAPI: false,
                                errorAPI: response.errors[ 0 ]
                            } );
                        }

                        if( isMountedRef.current && response.msg ) {
                            setState( {
                                dataAPI: null,
                                loadingAPI: false,
                                errorAPI: response.msg
                            } );
                        }
                    } else {
                        if( isMountedRef.current ) {
                            setState( {
                                dataAPI: response,
                                loadingAPI: false,
                                errorAPI: null
                            } );
                        }
                    }  
                } catch( err ) {
                    setState( { dataAPI: null, loadingAPI: false, errorAPI: err } );
                }                
            };

            executeRequest();
        } else {
            setState( { dataAPI: null, loadingAPI: false, errorAPI: null } );
        }
    }, [ endpoint, body ] );

    return state;
};

export default useFetch;
