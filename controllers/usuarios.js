const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios'); // Se importa el modelo

// Peticion get "Solicitar"
const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query; // Obtenemos los "query params". Paginacion
    const query = { estado: true }; // Se buscan los usuarios "activos"

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number(desde) )
            .limit( Number(limite) ) // Se castea e number, porque en la solicitud viene como string
    ]);

    res.json({
        total, 
        usuarios
    });
}

// Peticion post "Crear"
const usuariosPost = async (req, res = response) => {
    const { nombre, password, correo, rol } = req.body; // Obtenemos lo que viene en la solicitud
    const usuario = new Usuario({ nombre, password, correo, rol }); // Se crea una nueva instancia del usuario
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // Nivel de encriptacion. 10 por defecto
    usuario.password = bcryptjs.hashSync( password, salt ); // Se encripta la contraseña
    
    await usuario.save(); // Se guarda en la db
    
    res.json({
        msg: 'post API - controlador',
        nombre,
        password,
        correo,
        rol
    });
}

// Peticion put "Actualizar"
const usuariosPut = async (req, res = response) => {
    const { id } = req.params; // Obtenemos lo que viene en la solicitud
    const { _id, password, google, correo, ...resto } = req.body; // Obtenemos lo que viene del body

    // Validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // Nivel de encriptacion. 10 por defecto
        resto.password = bcryptjs.hashSync( password, salt ); // Se encripta la contraseña
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true} ); // Actualiza los campos de acuerdo al id

    res.json(usuario);
}

// Peticion delete "Eliminar"
const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id ); 

    // Se desactiva el estado para no perder la integridad de los datos
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }); 

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
