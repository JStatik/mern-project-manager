/*********************************************************************** RUTAS DE USUARIO / AUTH ***********************************************************************/
/*************************************************************************** HOST + /API/AUTH ***************************************************************************/
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validateFields } = require( '../middlewares/validateFields' );
const { verifyJWT } = require( '../middlewares/verifyJWT' );
const { login } = require( '../controllers/auth/login' );
const { register } = require( '../controllers/auth/register' );
const { renewJWT } = require( '../controllers/auth/renew' );

const router = Router();

router.post(
    '/',
    [
        check( 'email', 'Los datos ingresados no son válidos.' ).trim().not().isEmpty().isEmail(),
        check( 'password', 'Los datos ingresados no son válidos.' ).trim().not().isEmpty().isLength( { min: 6 } ).isAlphanumeric(),
        validateFields
    ],
    login
);

router.post(
    '/register',
    [ 
        check( 'name', 'Ingrese un nombre válido.' ).trim().not().isEmpty().isLength( { min: 2 } ).isString(),
        check( 'surname', 'Ingrese un apellido válido.' ).trim().not().isEmpty().isLength( { min: 2 } ).isString(),
        check( 'email', 'Ingrese un email válido.' ).trim().not().isEmpty().isEmail(),
        check( 'password', 'La contraseña no debe contener caracteres especiales y debe tener al menos 6 caracteres.' ).trim().not().isEmpty().isLength( { min: 6 } ).isAlphanumeric(),
        validateFields
    ],
    register
);

router.get( '/renew', verifyJWT, renewJWT );

module.exports = router;
