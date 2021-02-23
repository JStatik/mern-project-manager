const colors = require( 'colors' );
const bcrypt = require( 'bcryptjs' );
const { response } = require( 'express' );
const User = require( '../../models/user' );
const { createJWT } = require( '../../helpers/createJWT' );
const { isValidRegister } = require( '../../helpers/isValidRegister' );

const register = async( req, res = response ) => {
    const { name, surname, email, password } = req.body;

    const { isValid, nameValidator, surnameValidator, emailValidator, passwordValidator, errorsValidator } = isValidRegister( name, surname, email, password );

    if( !isValid ) {
        const arrErrors = Object.values( errorsValidator );

        const error = arrErrors.filter( err => {
            return err !== '';
        } );

        return res.status( 400 ).json(
            {
                ok: false,
                msg: error[ 0 ]
            }
        );
    }

    try {
        const verifyUser = await User.findOne( { email: emailValidator } );

        if( verifyUser ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'El email ingresado ya está en uso.'
                }
            );
        }

        const user = new User( {
            name: nameValidator,
            surname: surnameValidator,
            email: emailValidator,
            password: passwordValidator
        } );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( passwordValidator, salt );

        await user.save();

        const token = await createJWT( user._id );

        return res.status( 201 ).json(
            {
                ok: true,
                token: token,
                user: user
            }
        );
    } catch( err ) {
        console.log( colors.magenta( err ) );

        return res.status( 500 ).json(
            {
                ok: false,
                msg: 'Por favor, hable con el administrador.'
            }
        );
    }
};

module.exports = {
    register
};
