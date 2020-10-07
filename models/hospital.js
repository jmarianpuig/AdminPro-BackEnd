const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

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
    }
}, { collection: 'hospitales' }); // renombro la coleccion


// eliminar lo que no me intersa de la peticion
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});



module.exports = model( 'Hospital', HospitalSchema );