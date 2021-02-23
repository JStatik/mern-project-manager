const colors = require( 'colors' );
const validator = require( 'validator' );
const { response } = require( 'express' );
const Project = require( '../../models/project' );

const createProject = async( req, res = response ) => {
    const { uid } = req;
    const { project } = req.body;

    let projectValidator = validator.escape( project );
    projectValidator = validator.trim( projectValidator );

    if( !validator.isAlpha( projectValidator, [ 'es-ES' ], { ignore: ' -0123456789' } ) || validator.isEmpty( projectValidator ) || projectValidator.length < 2 ) {
        return res.status( 400 ).json(
            {
                ok: false,
                msg: 'El proyecto ingresado no es válido.'
            }
        );
    }

    try {
        const verifyProject = await Project.findOne( { project: projectValidator } );

        if( verifyProject ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'El proyecto ingresado, ya fue creado.'
                }
            );
        }

        const project = new Project( {
            user: uid,
            project: projectValidator
        } );

        await project.save();

        return res.status( 201 ).json(
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
    createProject
};
