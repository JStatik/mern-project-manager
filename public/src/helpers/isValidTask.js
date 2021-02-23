import validator from 'validator';

const isValidTask = ( task ) => {
    let taskValidator = validator.escape( task );
    taskValidator = validator.trim( taskValidator );

    if( !validator.isAlpha( taskValidator, [ 'es-ES' ], { ignore: ' ,.;-0123456789' } ) || validator.isEmpty( taskValidator ) || taskValidator.length < 2 ) {
        return {
            isValid: false,
            errorTask: 'La tarea ingresada no es válida.',
            taskValidator: null
        };
    }

    return {
        isValid: true,
        errorTask: '', 
        taskValidator
    };
};

export default isValidTask;
