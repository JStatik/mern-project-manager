const { Schema, model } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

const ProjectSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [ true, 'El usuario que crea el proyecto es obligatorio.' ]
        },
        project: {
            type: String,
            required: [ true, 'El nombre del proyecto es obligatorio.' ],
            unique: true
        }
    },
    {
        timestamps: true
    }
);

ProjectSchema.plugin( uniqueValidator, { message: 'El proyecto ingresado, ya fue creado.' } );

ProjectSchema.method( 'toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
} );

module.exports = model( 'Project', ProjectSchema );
