const Role = require('../models/role'); // Se importa el modelo de "rol"
const Usuario = require('../models/usuarios'); // Se importa el modelo "usuario"
const Categoria = require('../models/categoria') // Se importa el modelo "categoria"

// Funcion para validar el rol
const esRoleValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error( `El rol ${ rol } no está registrado en la DB` ) // Error personalizado
    } 
}

// Funcion para verificar si el correo existe
const emailExiste = async( correo = '' ) => {
    const existeEmail =  await Usuario.findOne({ correo }); // Devuelve falso o verdadero
    if ( existeEmail ) { // Si el correo ya existe
        throw new Error( `El correo ${ correo } ya está registradoen la DB` ) // Error personalizado
    }
}

// Funcion para verificar si el id de usuario existe
const existeUsuarioPorId = async( id ) => {
    const existeUsuario =  await Usuario.findById( id ); // Devuelve falso o verdadero
    if ( !existeUsuario ) { // Si el correo ya existe
        throw new Error( `El id ${ correo } no existe` ) // Error personalizado
    }
}

// Funcion para verificar si el id de categoria existe
const existeCategoriaPorId = async( id ) => {
    const existeCategoria =  await Categoria.findById( id ); // Devuelve falso o verdadero
    if ( !existeCategoria ) { // Si el correo ya existe
        throw new Error( `El id ${ id } no existe` ) // Error personalizado
    }
}

// Se exporta la funcion de validacion
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}