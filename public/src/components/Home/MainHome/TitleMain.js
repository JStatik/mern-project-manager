import React, { useContext } from 'react';
import { AuthContext } from '../../../context/Auth/AuthContext';

const TitleMain = () => {
    const { name } = useContext( AuthContext );

    return (
        <div className="col-12 p-0">
            <h2 className="title-home text-truncate">
                Hola { name }!
            </h2>
        </div>
    );
};

export default TitleMain;
