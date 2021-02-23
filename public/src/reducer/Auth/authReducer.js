import types from '../../types/types';

const authReducer = ( state, action ) => {
    switch( action.type ) {
        case types.login:
            return {
                ...state,
                ...action.payload
            };

        case types.logout:
            return {
                ...state,
                logged: false,
                name: null,
                uid: null
            };

        case types.register:
            return {
                ...state,
                ...action.payload
            };

        case types.verifyJWT:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

export default authReducer;
