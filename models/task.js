const { Schema, model } = require( 'mongoose' );

const TaskSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: [ true, 'El proyecto al que pertenece la tarea es obligatorio.' ]
        },
        task: {
            type: String,
            required: [ true, 'El nombre de la tarea es obligatorio.' ]
        },
        state: {
            type: Boolean,
            require: [ true, 'El estado de la tarea es obligatorio.' ],
            default: false
        }
    },
    {
        timestamps: true
    }
);

TaskSchema.method( 'toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
} );

module.exports = model( 'Task', TaskSchema );
