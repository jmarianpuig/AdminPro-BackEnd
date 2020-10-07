const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
       
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return  res.status(404).json({
                ok: false,
                msg: 'el email no es valido'
            });
        }
                
        // Verificar pass
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        
        if ( !validPassword ) {
            return  res.status(404).json({
                ok: false,
                msg: 'la contraseña no es válida'
            });
        }

        // generamos el token - JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


};

// Renovar el token
const renewToken = async( req, res = response ) => {

    const uid = req.uid;

    const token = await generarJWT( uid );

    res.json({
        ok: true,
        uid,
        token

    });
};


const googleSignIn = async( req, res = response ) => {

        const googleToken = req.body.token;

        
        try {
            
        const { name, email, picture} = await googleVerify( googleToken );
        
        // verificar si existe ya el usuario con el email
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        
        if( !usuarioDB ) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

        } else {
            // si existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // guardar en BD
        await usuario.save();

        // generamos el token - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            token
        });
        
    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        })
    }

}



module.exports = {
    login,
    renewToken,
    googleSignIn
};
    