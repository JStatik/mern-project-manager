/********************************************************************* RUTAS DE PROYECTOS / PROJECT *********************************************************************/
/************************************************************************* HOST + /API/PROJECT *************************************************************************/
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validateFields } = require( '../middlewares/validateFields' );
const { verifyJWT } = require( '../middlewares/verifyJWT' );
const { createProject } = require( '../controllers/project/createProject' );
const { deleteProject } = require( '../controllers/project/deleteProject' );
const { getProjectsByUser } = require( '../controllers/project/getProjectsByUser' );

const router = Router();

router.use( verifyJWT );

router.get(
    '/',
    getProjectsByUser
);

router.post(
    '/create',
    [
        check( 'project', 'El proyecto ingresado no es válido.' ).trim().not().isEmpty().isLength( { min: 2 } ).isString(),
        validateFields
    ],
    createProject
);

router.delete(
    '/delete/:id',
    deleteProject
);

module.exports = router;
