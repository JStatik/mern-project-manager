import React, { useContext } from 'react';
import { HomeContext } from '../../../context/Home/HomeContext';
import types from '../../../types/types';

const DeleteProjectButton = () => {
    const { dispatchHome } = useContext( HomeContext );

    const handleClick = () => {
        dispatchHome( {
            type: types.toggleDeleteProjectModal
        } );
    };

    return (
        <div className="col-8 offset-2 p-2">
            <button
                type="button"
                className="btn btn-block btn-delete-project"
                onClick={ handleClick }
            >
                DELETE PROJECT
            </button>
        </div>
    );
};

export default DeleteProjectButton;
