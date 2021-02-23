import React, { useContext } from 'react';
import { AsideContext } from '../../context/Home/AsideContext';
import { HomeContext } from '../../context/Home/HomeContext';
import ButtonNewProject from './AsideHome/ButtonNewProject';
import FormNewProject from './AsideHome/FormNewProject';
import LogoutButton from './AsideHome/LogoutButton';
import ProjectsList from './AsideHome/ProjectsList';
import TitleAside from './AsideHome/TitleAside';

const AsideHome = () => {
    const { showMain } = useContext( HomeContext );
    const { showProjectForm } = useContext( AsideContext );

    return (
        <aside className={ `col-md-3 animate__animated animate__fadeIn ${ showMain && 'd-none d-sm-block' }` }>
            <div className="panel-control mb-4">
                <TitleAside />

                <LogoutButton />
            </div>

            <div className="projects pt-0">
                {
                    showProjectForm
                        ?
                    <FormNewProject />
                        :
                    <ButtonNewProject />
                }

                <ProjectsList />
            </div>
        </aside>
    );
};

export default AsideHome;
