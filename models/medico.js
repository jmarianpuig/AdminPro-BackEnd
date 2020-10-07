const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true, 
    },
    img: {
        type: String,
    },
    usuario: {
        //referencia par enlazar con el usuario de la otra coleccion
        required: true,
        type: Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    hospital: {
        //referencia par enlazar con el hospital de la otra coleccion
        required: true,
        type: Schema.Types.ObjectId, 
        ref: 'Hospital'
    }
});

// eliminar lo que no me intersa de la peticion
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model( 'Medico', MedicoSchema );