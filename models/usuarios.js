const { Schema, model } = require('mongoose'); // paquete "mongoose"

// Esquema de usuarios
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true // No permitir correos duplicados
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        unique: true // No permitir contraseñas duplicados
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Se evita mostrar informacion confidencial al devolver el archivo json como respuesta a la solicitud. En este caso, la contraseña
UsuarioSchema.methods.toJson = function() {
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}

// Se exporta el modelo
module.exports = model( 'Usuario', UsuarioSchema ); // ('NombreModelo', modelo)