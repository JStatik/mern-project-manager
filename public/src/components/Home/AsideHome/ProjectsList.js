import React, { useContext, useEffect } from 'react';
import { AsideContext } from '../../../context/Home/AsideContext';
import { AuthContext } from '../../../context/Auth/AuthContext';
import { HomeContext } from '../../../context/Home/HomeContext';
import { MainContext } from '../../../context/Home/MainContext';
import useFetchToken from '../../../hooks/useFetchToken';
import LoadingProjects from './ProjectsList/LoadingProjects';
import Project from './ProjectsList/Project';
import TitleList from './ProjectsList/TitleList';
import types from '../../../types/types';

const ProjectsList = () => {
    const { startLogout } = useContext( AuthContext );
    const { clearHomeContext } = useContext( HomeContext );
    const { clearMainContext } = useContext( MainContext );
    const { projects, dispatchAside, clearAsideContext } = useContext( AsideContext );
    
    const user = JSON.parse( localStorage.getItem( 'upma' ) ); 
    const { dataAPI, loadingAPI, errorAPI } = useFetchToken( '/project', user?.token, 'GET' );

    useEffect( () => {
        if( dataAPI ) {
            dispatchAside( {
                type: types.getAllProjects,
                payload: dataAPI.projects
            } );
        }
    }, [ dataAPI, dispatchAside ] );

    useEffect( () => {
        if( errorAPI || !user ) {
            startLogout();
            clearHomeContext();
            clearAsideContext();
            clearMainContext();
        }
    }, [ user, errorAPI, startLogout, clearHomeContext, clearAsideContext, clearMainContext ] );

    return (
        <div className="row mt-5">
            <TitleList />
            
            {
                loadingAPI
                    ?
                <LoadingProjects />
                    :
                <div className="col-12">
                    <div className="list-group">
                        {
                            projects.map( project => (
                                <Project
                                    key={ project.id }
                                    project={ project }
                                />
                            ) )
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default ProjectsList;
