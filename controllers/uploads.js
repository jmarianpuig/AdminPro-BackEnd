const path = require('path'); // path para buscar las imagenes subidas
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");




const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios' ];
    if ( !tiposValidos.includes(tipo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipos)'
        });
    }
    
    // validar que exista algun archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos para subir.'
        });
    }   

    // Procesar la imagen
    const file = req.files.imagen;

    // sacar la extension del archivo
    const nombreCortado = file.name.split('.');
    const extArchivo = nombreCortado [ nombreCortado.length - 1 ];

    // Validar la extension
    const extValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if ( !extValidas.includes( extArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida (jpf, png, jpeg, gif)'
        });
    }

    // Generar nuevo nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;
  
    // Use the mv() method to place the file somewhere on your server
    file.mv( path, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                msg: 'No se pudo subir el archivo'
            });  
        }      

    // Actualizar la BD (Creo un helper(actualizar imagen) para descargar el js)  
        actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'archivo uploaded!',
            nombreArchivo
        });
    });




};


// ver imagenes subidas
const verImg = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto   = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );
    
    // imagen por defecto si no hay ninguna en el perfil
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }



};


module.exports = {
    fileUpload,
    verImg
};