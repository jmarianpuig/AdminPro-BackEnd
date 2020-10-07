/**
 *   Ruta: '/api/buscar/' 
 **/ 

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { buscarTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();

router.get( '/:buscar' , validarJWT, buscarTodo );

router.get( '/coleccion/:tabla/:buscar' , validarJWT, getDocumentosColeccion );


module.exports = router;