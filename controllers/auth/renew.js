const colors = require( 'colors' );
const { response } = require( 'express' );
const { createJWT } = require( '../../helpers/createJWT' );
const User = require( '../../models/user' );

const renewJWT = async( req, res = response ) => {
    const { uid } = req;

    try {
        const user = await User.findById( uid );

        if( !user ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'Usuario inexistente.'
                }
            );
        }

        const token = await createJWT( uid );
    
        return res.status( 200 ).json(
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
    renewJWT
};
