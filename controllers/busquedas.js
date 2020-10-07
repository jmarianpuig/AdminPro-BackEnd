const { response } = require('express');

const Usuarios = require('../models/usuario');
const Hospitales = require('../models/hospital');
const Medicos = require('../models/medico');



const buscarTodo = async(req, res = response ) => {

    const buscaTodos = req.params.buscar;
    const regex = new RegExp( buscaTodos, 'i' ); // hacer las busqueda insensible 'i'

    const [ usuarios, medicos, hospitales ] = await Promise.all([

        Usuarios.find({ nombre: regex }),
        Medicos.find({ nombre: regex }),
        Hospitales.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales

    });

};


const getDocumentosColeccion = async(req, res = response ) => {

    const tabla = req.params.tabla;
    const buscar = req.params.buscar;
    const regex = new RegExp( buscar, 'i' ); // hacer las busqueda insensible 'i'

    let data = [];

    switch ( tabla ) {
        case 'usuarios':
            data = await Usuarios.find({ nombre: regex })
        break;
        
        case 'medicos':
            data = await Medicos.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;
                
        case 'hospitales':
            data = await Hospitales.find({ nombre: regex })
                                   .populate('usuario', 'nombre img');
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser medicos/usuarios/hopistales'
            });


            
    }

    res.json({
        ok: true,
        resultados: data
    });


    // const [ usuarios, medicos, hospitales ] = await Promise.all([

    //     Usuarios.find({ nombre: regex }),
    //     Medicos.find({ nombre: regex }),
    //     Hospitales.find({ nombre: regex }),
    // ]);


};



module.exports = {
    buscarTodo,
    getDocumentosColeccion
}