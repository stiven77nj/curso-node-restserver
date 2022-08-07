const { Schema, model } = require('mongoose'); // Paquete "mongoose"

// Modelo de categoria
const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true // No se admiten categorias iguales
    },
    estado : {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: { // Usuario que crea la categoria
        type: Schema.Types.ObjectId, // Hace referencia a otro eschema
        ref: 'Usuario',
        required: true
    }
});

// Se evita mostrar informacion confidencial al devolver el archivo json como respuesta a la solicitud. En este caso, el estado
CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject(); // Solo se muestra el id y el nombre de la categoria
    return data;
}

// Exportacion del modelo
module.exports = model( 'Categoria', CategoriaSchema );