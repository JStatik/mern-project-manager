import types from '../../types/types';

const mainReducer = ( state, action ) => {
    switch( action.type ) {
        case types.getAllTasks:
            return {
                ...state,
                tasks: action.payload
            };

        case types.addNewTaskMain:
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            };

        case types.deleteTaskMain:
            return {
                ...state,
                tasks: state.tasks.filter( task => (
                    task.id !== action.payload
                ) )
            };

        case types.changeStateTask:
            return {
                ...state,
                tasks: state.tasks.map( task => {
                    if( task.id === action.payload ) {
                        task.state = !task.state;
                    }

                    return task;
                } )
            };

        case types.editTask:
            return {
                ...state,
                showEditTaskModal: false,
                activeTask: {},
                tasks: state.tasks.map( task => {
                    if( task.id === action.payload.id ) {
                        task = action.payload;
                    }

                    return task;
                } )
            };

        case types.activeTask:
            return {
                ...state,
                showEditTaskModal: true,
                activeTask: state.tasks.find( task => (
                    task.id === action.payload
                ) )
            };

        case types.removeActiveTask:
            return {
                ...state,
                showEditTaskModal: false,
                activeTask: {}
            };

        case types.clearMainContext:
            return {
                ...state,
                activeTask: {},
                showEditTaskModal: false,
                tasks: []
            };

        default:
            return state;
    }
};

export default mainReducer;
