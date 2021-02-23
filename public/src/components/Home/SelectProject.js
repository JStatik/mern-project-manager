import React, { useContext } from 'react';
import { HomeContext } from '../../context/Home/HomeContext';

const SelectProject = () => {
    const { showMain } = useContext( HomeContext );

    return (
        <section className={ `col-md-9 animate__animated animate__fadeIn ${ !showMain && 'd-none d-sm-block' }` }>
            <main className="select-project">
                <div className="col-12 p-0">
                    <div className="alert p-5 text-center" role="alert">
                        Selecciona un proyecto, para empezar a trabajar.
                    </div>
                </div>
            </main>
        </section>
    );
};

export default SelectProject;
