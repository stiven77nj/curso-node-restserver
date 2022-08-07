const jwt = require('jsonwebtoken'); 
const { request, response } = require('express');

const Usuario = require('../models/usuarios'); // Se importa el modelo

// Funcion para validar el jwt
const validarJWT = async ( req = request , res = response, next ) => {
    const token = req.header('x-token'); // Se obtiene la informacion de los headers
    
    if ( !token ) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY ); 
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );
        // Verificar si el usuario existe
        if ( !usuario ) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existe en BD"
            }); 
        }
        // Verificar si el "uid" tiene estado en "true"
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: "Token no valido - usuario con estado: false"
            });
        }
        
        req.usuario = usuario;
        next(); 
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token no valido"
        });
    }
}

// Se exporta la funcion
module.exports = {
    validarJWT 
}