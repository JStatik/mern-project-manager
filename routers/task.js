/************************************************************************ RUTAS DE TAREAS / TASK ************************************************************************/
/*************************************************************************** HOST + /API/TASK ***************************************************************************/
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validateFields } = require( '../middlewares/validateFields' );
const { verifyJWT } = require( '../middlewares/verifyJWT' );
const { createTask } = require( '../controllers/task/createTask' );
const { deleteTaskByTaskId } = require( '../controllers/task/deleteTaskByTaskId' );
const { getTasksByProject } = require( '../controllers/task/getTasksByProject' );
const { updateNameTaskByTaskId } = require( '../controllers/task/updateNameTaskByTaskId' );
const { updateStateTaskByTaskId } = require( '../controllers/task/updateStateTaskByTaskId' );

const router = Router();

router.use( verifyJWT );

router.get(
    '/:id',
    getTasksByProject
);

router.post(
    '/create/:id',
    [
        check( 'task', 'La tarea ingresada no es válida.' ).trim().not().isEmpty().isLength( { min: 2 } ).isString(),
        validateFields
    ],
    createTask
);

router.put(
    '/update/name/:id',
    [
        check( 'task', 'La tarea ingresada no es válida.' ).trim().not().isEmpty().isLength( { min: 2 } ).isString(),
        validateFields
    ],
    updateNameTaskByTaskId
);

router.put(
    '/update/state/:id',
    updateStateTaskByTaskId
);

router.delete(
    '/delete/:id',
    deleteTaskByTaskId
);

module.exports = router;
