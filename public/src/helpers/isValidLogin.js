import validator from 'validator';

const isValidLogin = ( email, password ) => {
    let emailValidator = validator.escape( email );
    let passwordValidator = validator.escape( password );

    emailValidator = validator.trim( emailValidator );
    emailValidator = validator.normalizeEmail( emailValidator, { all_lowercase: false, gmail_remove_dots: false } );

    passwordValidator = validator.trim( passwordValidator );

    if( !validator.isEmail( emailValidator ) || validator.isEmpty( emailValidator ) ) {
        return {
            isValid: false,
            errorLogin: 'Los datos ingresados no son válidos.',
            emailValidator: null,
            passwordValidator: null
        };
    }
    
    if( !validator.isAlphanumeric( passwordValidator, [ 'es-ES' ] ) || validator.isEmpty( passwordValidator ) || passwordValidator.length <= 5 ) {
        return {
            isValid: false,
            errorLogin: 'Los datos ingresados no son válidos.',
            emailValidator: null,
            passwordValidator: null
        };
    }

    return {
        isValid: true,
        errorLogin: '', 
        emailValidator,
        passwordValidator
    };
};

export default isValidLogin;
