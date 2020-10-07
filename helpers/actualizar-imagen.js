const Usuario = require('../models/usuario');
const fs = require('fs');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // Borra la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async( tipo, id, nombreArchivo ) => {

    let pathViejo = '';

    switch ( tipo ) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es usuario por id');
                return false;
            }
            // busca si existe ya una imagen en la carpeta
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);
            // grabar imagen nueva        
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    
        case 'medicos':
            const medico = await Medico.findById(id);
            if ( !medico ) {
                console.log('No es medico por id');
                return false;
            }
            // busca si existe ya una imagen en la carpeta
            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);
            // grabar imagen nueva        
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            
        break;
    
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log('No es hospital por id');
                return false;
            }
            // busca si existe ya una imagen en la carpeta
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);
            // grabar imagen nueva        
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        break;

    }


};




module.exports = {
    actualizarImagen
}


