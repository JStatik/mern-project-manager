const colors = require( 'colors' );
const validator = require( 'validator' );
const { response } = require( 'express' );
const Task = require( '../../models/task' );
const Project = require( '../../models/project' );

const updateStateTaskByTaskId = async( req, res = response ) => {
    const { uid } = req;
    const { id: taskId } = req.params;

    let taskIdValidator = validator.escape( taskId );
    taskIdValidator = validator.trim( taskIdValidator );

    if( !validator.isMongoId( taskIdValidator ) || validator.isEmpty( taskIdValidator ) || taskIdValidator.length !== 24 ) {
        return res.status( 400 ).json(
            {
                ok: false,
                msg: 'El ID de la tarea es incorrecto.'
            }
        );
    }

    try {
        const verifyTask = await Task.findById( taskIdValidator );

        if( !verifyTask ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'La tarea es inexistente.'
                }
            );
        }

        const { project: projectId } = verifyTask;
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
            taskIdValidator,
            { state: !verifyTask.state },
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
    updateStateTaskByTaskId
};
