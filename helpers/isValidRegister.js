const validator = require( 'validator' );

const isValidRegister = ( name, surname, email, password ) => {
    let nameValidator = validator.escape( name );
    let surnameValidator = validator.escape( surname );
    let emailValidator = validator.escape( email );
    let passwordValidator = validator.escape( password );

    nameValidator = validator.trim( nameValidator );
    surnameValidator = validator.trim( surnameValidator );
    passwordValidator = validator.trim( passwordValidator );

    emailValidator = validator.trim( emailValidator );
    emailValidator = validator.normalizeEmail( emailValidator, { all_lowercase: false, gmail_remove_dots: false } );

    if( !validator.isAlpha( nameValidator, [ 'es-ES' ] ) || validator.isEmpty( nameValidator ) || nameValidator.length < 2 ) {
        return {
            isValid: false,
            nameValidator: null,
            surnameValidator: null,
            emailValidator: null,
            passwordValidator: null,
            errorsValidator: {
                errorName: 'Ingrese un nombre válido.',
                errorSurname: '',
                errorEmail: '',
                errorPassword: ''
            }
        };
    }

    if( !validator.isAlpha( surnameValidator, [ 'es-ES' ] ) || validator.isEmpty( surnameValidator ) || surnameValidator.length < 2 ) {
        return {
            isValid: false,
            nameValidator: null,
            surnameValidator: null,
            emailValidator: null,
            passwordValidator: null,
            errorsValidator: {
                errorName: '',
                errorSurname: 'Ingrese un apellido válido.',
                errorEmail: '',
                errorPassword: ''
            }
        };
    }

    if( !validator.isEmail( emailValidator ) || validator.isEmpty( emailValidator ) ) {
        return {
            isValid: false,
            nameValidator: null,
            surnameValidator: null,
            emailValidator: null,
            passwordValidator: null,
            errorsValidator: {
                errorName: '',
                errorSurname: '',
                errorEmail: 'Ingrese un email válido.',
                errorPassword: ''
            }
        };
    }
    
    if( !validator.isAlphanumeric( passwordValidator, [ 'es-ES' ] ) || validator.isEmpty( passwordValidator ) || passwordValidator.length <= 5 ) {
        return {
            isValid: false,
            nameValidator: null,
            surnameValidator: null,
            emailValidator: null,
            passwordValidator: null,
            errorsValidator: {
                errorName: '',
                errorSurname: '',
                errorEmail: '',
                errorPassword: 'La contraseña no debe contener caracteres especiales y debe tener al menos 6 caracteres.'
            }
        };
    }

    return {
        isValid: true,
        nameValidator,
        surnameValidator,
        emailValidator,
        passwordValidator,
        errorsValidator: {
            errorName: null,
            errorSurname: null,
            errorEmail: null,
            errorPassword: null
        }
    };
};

module.exports = {
    isValidRegister
};
