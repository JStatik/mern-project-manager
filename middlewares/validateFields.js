const { response } = require( 'express' );
const { validationResult } = require( 'express-validator' );

const validateFields = ( req, res = response, next ) => {
    const errors = validationResult( req );

    if( !errors.isEmpty() ) {
        let arrErrors = Object.values( errors.mapped() );

        arrErrors = arrErrors.map( err => {
            return err.msg;
        } );

        return res.status( 400 ).json(
            {
                ok: false,
                errors: arrErrors
            }
        );
    }

    next();
};

module.exports = {
    validateFields
};
