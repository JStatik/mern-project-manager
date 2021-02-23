import React, { useContext } from 'react';
import { AsideContext } from '../../../context/Home/AsideContext';
import types from '../../../types/types';

const ButtonNewProject = () => {
    const { dispatchAside } = useContext( AsideContext );

    const handleClick = () => {
        dispatchAside( {
            type: types.showProjectForm
        } );
    };

    return (
        <div className="row mb-2 animate__animated animate__fadeIn">
            <div className="col-12 text-center">
                <button
                    type="button"
                    className="btn btn-block"
                    onClick={ handleClick }
                >
                    New Project
                </button>
            </div>
        </div>
    );
};

export default ButtonNewProject;
