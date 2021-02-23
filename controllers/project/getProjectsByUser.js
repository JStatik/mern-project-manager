const colors = require( 'colors' );
const { response } = require( 'express' );
const Project = require( '../../models/project' );

const getProjectsByUser = async( req, res = response ) => {
    const { uid } = req;

    try {
        const projects = await Project.find( { user: uid } )
            .sort( { createdAt: 'desc' } )
            .exec();

        return res.status( 200 ).json(
            {
                ok: true,
                projects
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
    getProjectsByUser
};
