const { Router } = require('express');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router = Router();


// Peticion get "Solicitar". Se llama al controlador
router.get( '/', usuariosGet );

// Peticion post "Crear". Se llama al controlador
router.post('/', usuariosPost );

// Peticion put "Actualizar". Se llama al controlador
router.put('/:id', usuariosPut ); // Ahora debe recibir siempre un id. Sale error si no se envia un id

// Peticion delete "Eliminar". Se llama al controlador
router.delete('/', usuariosDelete );

module.exports = router;