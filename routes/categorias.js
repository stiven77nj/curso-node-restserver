const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');

const { validarCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], 
obtenerCategoria);

// Crear categorias - privado - cualquier persona con un token valido
router.post('/', [ 
    validarJWT, // Se valida el JWT
    check('nombre','El nombre es obligatorio').not().isEmpty(), // Se valida el nombre
    validarCampos
], 
crearCategoria); // Se llama al controlador

// Actualizar un registro - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT, // Se valida el JWT
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo valido').isMongoId(), // Se valida si el id es valido
    check('id').custom( existeCategoriaPorId ), // Se valida por id si la categoria existe
    validarCampos
], 
actualizarCategoria);

// Borrar una cateogoria - Admin
router.delete('/:id', [
    validarJWT, // Se valida el JWT
    esAdminRole, // Solo el admin elimina categorias
    check('id', 'No es un id de mongo valido').isMongoId(), // Se valida si el id es valido
    check('id').custom( existeCategoriaPorId ), // Se valida por id si la categoria existe
    validarCampos
],
eliminarCategoria);

// Exportacion de las peticiones
module.exports = router;