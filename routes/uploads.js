/**
 *   Ruta: '/api/uploads/' 
 **/ 

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, verImg } = require('../controllers/uploads');

const router = Router();


router.use( expressFileUpload() );

router.put( '/:tipo/:id' , validarJWT, fileUpload );

router.get( '/:tipo/:foto' , validarJWT, verImg );


module.exports = router;