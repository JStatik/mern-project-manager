import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MainContext } from '../../../../../context/Home/MainContext';
import types from '../../../../../types/types';

const EditButton = ( { id } ) => {
    const { dispatchMain } = useContext( MainContext );

    const handleClick = () => {
        dispatchMain( {
            type: types.activeTask,
            payload: id
        } );
    };

    return (
        <div className="col-4 col-sm-4 col-md-1 p-0">
            <button
                type="button"
                className="btn btn-sm"
                onClick={ handleClick }
            >
                <i className="fas fa-pen"></i>
            </button>
        </div>
    );
};

EditButton.propTypes = {
    id: PropTypes.string.isRequired
};

export default EditButton;
