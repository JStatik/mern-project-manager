const colors = require( 'colors' );
const { response } = require( 'express' );
const Task = require( '../../models/task' );
const Project = require( '../../models/project' );
const { isValidTask } = require( '../../helpers/isValidTask' );

const updateNameTaskByTaskId = async( req, res = response ) => {
    const { uid } = req;
    const { task } = req.body;
    const { id: taskId } = req.params;

    const { isValid, taskValidator, mongoIdValidator, errorsValidator } = isValidTask( taskId, task );

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
        const verifyTask = await Task.findById( mongoIdValidator );

        if( !verifyTask ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'La tarea es inexistente.'
                }
            );
        }

        if( verifyTask.task === taskValidator ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'No se registra cambio alguno en el nombre la tarea.'
                }
            );
        }

        const { project: projectId } = verifyTask;
        const verifyNameTask = await Task.findOne( { task: taskValidator, project: projectId } );

        if( verifyNameTask ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'La tarea ingresada, ya fue creada.'
                }
            );
        }

        const verifyProject = await Project.findById( projectId );

        if( verifyProject.user.toString() !== uid ) {
            return res.status( 401 ).json(
                {
                    ok: false,
                    msg: 'No posee autorización para editar esta tarea.'
                }
            );
        }

        const taskUpdated = await Task.findByIdAndUpdate(
            mongoIdValidator,
            { task: taskValidator },
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );

        return res.status( 200 ).json(
            {
                ok: true,
                task: taskUpdated
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
    updateNameTaskByTaskId
};
