import types from '../../types/types';

const homeReducer = ( state, action ) => {
    switch( action.type ) {
        case types.activeProject:
            return {
                ...state,
                showMain: true,
                showSelectProject: false,
                activeProject: action.payload
            };

        case types.inactiveProject:
            return {
                ...state,
                showMain: false,
                showSelectProject: true,
                activeProject: {}
            };

        case types.hideFormTasks:
            return {
                ...state,
                hideFormTasks: action.payload
            };

        case types.addNewProjectHome:
            return {
                ...state,
                showMain: true,
                showSelectProject: false,
                activeProject: action.payload
            };

        case types.toggleDeleteProjectModal:
            return {
                ...state,
                toggleDeleteProjectModal: !state.toggleDeleteProjectModal
            };

        case types.deleteProjectHome:
            return {
                ...state,
                showMain: false,
                showSelectProject: true,
                toggleDeleteProjectModal: false,
                activeProject: {}
            };

        case types.clearHomeContext:
            return {
                ...state,
                showMain: false,
                showSelectProject: true,
                toggleDeleteProjectModal: false,
                activeProject: {},
                hideFormTasks: false
            };

        default:
            return state;
    }
};

export default homeReducer;
