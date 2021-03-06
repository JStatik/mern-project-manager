const colors = require( 'colors' );
const mongoose = require( 'mongoose' );

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CONNECTION, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } );

        console.log( colors.yellow( 'DB Online.' ) );
    } catch( err ) {
        console.log( colors.magenta( err ) );
        console.log( colors.red( 'Error al inicializar la base de datos.' ) );
        return;
    }
};

module.exports = {
    dbConnection
};
