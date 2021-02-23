import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { HomeContext } from '../../../../context/Home/HomeContext';
import types from '../../../../types/types';

const Project = ( { project } ) => {
    const { activeProject, dispatchHome } = useContext( HomeContext );

    const handleClick = () => {
        dispatchHome( {
            type: types.activeProject,
            payload: project
        } );

        dispatchHome( {
            type: types.hideFormTasks,
            payload: true
        } );
    };

    return (
        <button
            className={ `list-group-item list-group-item-action animate__animated animate__fadeInLeft ${ project.project === activeProject.project && 'active' }` }
            type="button"
            onClick={ handleClick }
        >
            { project.project }
        </button>
    );
};

Project.propTypes = {
    project: PropTypes.object.isRequired
};

export default Project;
