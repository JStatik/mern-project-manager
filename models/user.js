const { Schema, model } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

const UserSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio.' ]
    },
    surname: {
        type: String,
        required: [ true, 'El apellido es obligatorio.' ]
    },
    email: {
        type: String,
        required: [ true, 'El email es obligatorio.' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria.' ]
    }
} );

UserSchema.plugin( uniqueValidator, { message: 'El email ingresado, ya está en uso.' } );

UserSchema.method( 'toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
} );

module.exports = model( 'User', UserSchema );
