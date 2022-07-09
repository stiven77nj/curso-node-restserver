const { response, request } = require('express');

// Peticion get "Solicitar"
const usuariosGet = (req = request, res = response) => {
    const query = req.query; // Obtenemos los "query params"
    res.json({
        msg: 'get API - controlador',
        query
    });
}

// Peticion post "Crear"
const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body; // Obtenemos lo que viene en la solicituds
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

// Peticion put "Actualizar"
const usuariosPut = (req, res = response) => {
    const id = req.params.id; // Obtenemos lo que viene en la solicitud

    res.json({
        msg: 'put API - controlador',
        id
    });
}

// Peticion delete "Eliminar"
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
