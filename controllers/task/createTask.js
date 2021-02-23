const colors = require( 'colors' );
const { response } = require( 'express' );
const Task = require( '../../models/task' );
const Project = require( '../../models/project' );
const { isValidTask } = require( '../../helpers/isValidTask' );

const createTask = async( req, res = response ) => {
    const { uid } = req;
    const { task } = req.body;
    const { id: projectId } = req.params;

    const { isValid, taskValidator, mongoIdValidator, errorsValidator } = isValidTask( projectId, task );

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
        const verifyProject = await Project.findById( mongoIdValidator );

        if( !verifyProject ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'El proyecto es inexistente.'
                }
            );
        }

        if( verifyProject.user.toString() !== uid ) {
            return res.status( 401 ).json(
                {
                    ok: false,
                    msg: 'No posee autorización para crear esta tarea.'
                }
            );
        }

        const verifyTask = await Task.findOne( { task: taskValidator, project: projectId } );

        if( verifyTask ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'La tarea ingresada, ya fue creada.'
                }
            );
        }

        const task = new Task( {
            project: mongoIdValidator,
            task: taskValidator
        } );

        await task.save();

        return res.status( 201 ).json(
            {
                ok: true,
                task
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
    createTask
};
