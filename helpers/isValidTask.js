const validator = require( 'validator' );

const isValidTask = ( mongoId, task ) => {
    let taskValidator = validator.escape( task );
    let mongoIdValidator = validator.escape( mongoId );

    taskValidator = validator.trim( taskValidator );
    mongoIdValidator = validator.trim( mongoIdValidator );

    if( !validator.isMongoId( mongoIdValidator ) || validator.isEmpty( mongoIdValidator ) || mongoIdValidator.length !== 24 ) {
        return {
            isValid: false,
            taskValidator: null,
            mongoIdValidator: null,
            errorsValidator: {
                errorTask: '',
                errorProjectId: 'El ID es incorrecto.'
            }
        };
    }

    if( !validator.isAlpha( taskValidator, [ 'es-ES' ], { ignore: ' ,.;-0123456789' } ) || validator.isEmpty( taskValidator ) || taskValidator.length < 2 ) {
        return {
            isValid: false,
            taskValidator: null,
            mongoIdValidator: null,
            errorsValidator: {
                errorTask: 'La tarea ingresada no es válida.',
                errorProjectId: ''
            }
        };
    }

    return {
        isValid: true,
        taskValidator,
        mongoIdValidator: mongoIdValidator,
        errorsValidator: {
            errorTask: null,
            errorProjectId: null
        }
    };
};

module.exports = {
    isValidTask
};
