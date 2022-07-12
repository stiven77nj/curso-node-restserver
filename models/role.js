const { Schema, model } = require('mongoose'); // Paquete ""mongoose

// Modelo de rol
const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

// Exportacion del modelo
module.exports = model( 'Role', RoleSchema );