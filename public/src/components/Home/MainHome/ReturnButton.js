import React, { useContext } from 'react';
import { HomeContext } from '../../../context/Home/HomeContext';
import types from '../../../types/types';

const ReturnButton = () => {
    const { dispatchHome } = useContext( HomeContext );

    const handleClick = () => {
        dispatchHome( {
            type: types.inactiveProject
        } );
    };

    return (
        <div className="col-12 text-center d-block d-sm-none">
            <button
                className="btn btn-sm"
                onClick={ handleClick }
            >
                <i className="fas fa-arrow-left"></i>
            </button>
        </div>
    );
};

export default ReturnButton;
