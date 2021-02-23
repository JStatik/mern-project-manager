import types from '../../types/types';

const asideReducer = ( state, action ) => {
    switch( action.type ) {
        case types.showProjectForm:
            return {
                ...state,
                showProjectForm: true
            };

        case types.getAllProjects:
            return {
                ...state,
                projects: action.payload
            };

        case types.addNewProjectAside:
            return {
                ...state,
                showProjectForm: false,
                projects: [
                    action.payload,
                    ...state.projects
                ]
            };

        case types.deleteProjectAside:
            return {
                ...state,
                projects: state.projects.filter( project => (
                    project.id !== action.payload
                ) )
            };

        case types.clearAsideContext:
            return {
                ...state,
                projects: [],
                showProjectForm: false
            };

        default:
            return state;
    }
};

export default asideReducer;
