const colors = require( 'colors' );
const validator = require( 'validator' );
const { response } = require( 'express' );
const Task = require( '../../models/task' );
const Project = require( '../../models/project' );

const deleteProject = async( req, res = response ) => {
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
        const project = await Project.findById( projectIdValidator );

        if( !project ) {
            return res.status( 404 ).json(
                {
                    ok: false,
                    msg: 'El proyecto es inexistente.'
                }
            );
        }

        if( project.user.toString() !== uid ) {
            return res.status( 401 ).json(
                {
                    ok: false,
                    msg: 'No posee autorización para eliminar este proyecto.'
                }
            );
        }

        await Task.deleteMany( { project: projectIdValidator } );
        await Project.findByIdAndDelete( projectIdValidator );

        return res.status( 200 ).json(
            {
                ok: true,
                project
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
    deleteProject
};
