const { response, request } = require('express');
const { validationResult } = require('express-validator');

// Middleware para validar errores
const validarCampos = (req = request, res = response, next) => {
    // Validacion de errores
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            errors
        });
    }
    next(); // Si no hay error, sigue el flujo
}

module.exports = {
    validarCampos
}