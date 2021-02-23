const colors = require( 'colors' );
const validator = require( 'validator' );
const { response } = require( 'express' );
const Task = require( '../../models/task' );
const Project = require( '../../models/project' );

const getTasksByProject = async( req, res = response ) => {
    const { uid } = req;
    const { id: projectId } = req.params;

    let projectIdValidator = validator.escape( projectId );
    projectIdValidator = validator.trim( projectIdValidator );

    if( !validator.isMongoId( projectIdValidator ) || validator.isEmpty( projectIdValidator ) || projectIdValidator.length !== 24 ) {
        return res.status( 400 ).json(
            {
                ok: false,
                msg: 'El ID del proyecto es incorrecto.'
            }
        );
    }

    try {
        const verifyProject = await Project.findById( projectIdValidator );

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
                    msg: 'No posee autorización para obtener estas tareas.'
                }
            );
        }

        const tasks = await Task.find( { project: projectIdValidator } )
            .sort( { createdAt: 'asc' } )
            .exec();

        return res.status( 200 ).json(
            {
                ok: true,
                tasks
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
    getTasksByProject
};
