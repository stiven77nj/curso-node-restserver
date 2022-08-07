const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-JWT'); // Se llama la funcion para generar el JWT
const Usuario = require('../models/usuarios'); // Se importa el modelo usuarios

// Funcion para hacer la peticion. Controlador
const login = async ( req = request, res = response ) => {

    const { correo, password } = req.body;

    try {
        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo }); // Buscamos si el correo esta registrado
        if ( !usuario ) { 
            return res.status(400).json({
                msg: 'Email / Password no son correctos - correo'
            });
        }
        // Verificar si el usuario esta activo
        if ( !usuario.estado ) { // Si el estado es falso
            return res.status(400).json({
                msg: 'Email / Password no son correctos - estado: false'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) { // Si las contraseñas no hacen match
            return res.status(400).json({
                msg: 'Email / Password no son correctos - password'
            });
        }

        // Generar el JSON WEB TOKEN
        const token = await generarJWT( usuario.id ); // Recibe como parametro lo que se quiere guardar en el payload

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }
}


// Exportacion de los controladores
module.exports = {
    login
};