import React, { useContext } from 'react';
import { AsideContext } from '../../../context/Home/AsideContext';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { HomeContext } from '../../../context/Home/HomeContext';
import { MainContext } from '../../../context/Home/MainContext';

const LogoutButton = () => {
    const { startLogout } = useContext( AuthContext );
    const { clearHomeContext } = useContext( HomeContext );
    const { clearAsideContext } = useContext( AsideContext );
    const { clearMainContext } = useContext( MainContext );

    const handleClick = () => {
        startLogout();
        clearHomeContext();
        clearAsideContext();
        clearMainContext();
    };

    return (
        <div className="col-12 text-center">
            <button
                className="btn btn-sm btn-logout"
                onClick={ handleClick }
            >
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </div>
    );
};

export default LogoutButton;
