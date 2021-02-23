import validator from 'validator';

const isValidProject = ( project ) => {
    let projectValidator = validator.escape( project );
    projectValidator = validator.trim( projectValidator );

    if( !validator.isAlpha( projectValidator, [ 'es-ES' ], { ignore: ' -0123456789' } ) || validator.isEmpty( projectValidator ) || projectValidator.length < 2 ) {
        return {
            isValid: false,
            errorProject: 'El proyecto ingresado no es válido.',
            projectValidator: null
        };
    }

    return {
        isValid: true,
        errorProject: '', 
        projectValidator
    };
};

export default isValidProject;
