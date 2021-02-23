const colors = require( 'colors' );
const path = require( 'path' );
const cors = require( 'cors' );
const express = require( 'express' );
const { dbConnection } = require( '../database/config' );

class Server {
    constructor() {
        this.app = express();

        /************************************************************************ BASE DE DATOS ************************************************************************/
        dbConnection();
    }

    middlewares = () => {
        /***************************************************************************** CORS *****************************************************************************/
        this.app.use( cors() );

        /********************************************************************** DIRECTORIO PUBLICO **********************************************************************/
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        /****************************************************************** LECTURA Y PARSEO DEL BODY ******************************************************************/
        this.app.use( express.json() );

        /************************************************************************** ENDPOINTS **************************************************************************/
        this.app.use( '/api/auth', require( '../routers/auth' ) );
        this.app.use( '/api/project', require( '../routers/project' ) );
        this.app.use( '/api/task', require( '../routers/task' ) );
        this.app.get( '*', ( req, res ) => {
            res.sendFile( path.join( __dirname, '../public/index.html' ) );
        } );
    }

    execute = () => {
        this.middlewares();

        /**************************************************************************** SERVER ****************************************************************************/
        this.app.listen( process.env.PORT, () => {
            console.log( colors.yellow( `Servidor corriendo en puerto: ${ process.env.PORT }` ) );
        } );
    }
}

module.exports = Server;
