import { useState } from 'react';

const useForm = ( initialState = {} ) => {
    const [ formValues, setFormValues ] = useState( initialState );

    const handleChange = ( event ) => {
        setFormValues( {
            ...formValues,
            [ event.target.name ]: event.target.value
        } );
    };

    const reset = ( newState = initialState ) => {
        setFormValues( newState );
    };

    return [ formValues, handleChange, reset ];
};

export default useForm;
