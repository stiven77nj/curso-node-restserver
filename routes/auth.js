const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/valida-campos');

const router = Router();

// Peticion get "Solicitar". Se llama al controlador
router.post( '/login', [
    check('correo', 'El correo es obligatorio').isEmail(), // Se valida si lo ingresado es un correo
    check('password', 'La contraseña es obligatorio').not().isEmpty(), // Se valida que el campo password no esté vacio
    validarCampos
], login );


// Exportacion de las peticiones
module.exports = router;