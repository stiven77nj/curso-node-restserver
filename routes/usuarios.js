const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRoles } = require('../middlewares/validar-roles');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

// Peticion get "Solicitar". Se llama al controlador
router.get( '/', usuariosGet );

// Peticion post "Crear". Se llama al controlador
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // Se valida el nombre
    check('password', 'El password es obligatorio y deben ser más de 6 letras').isLength({ min: 6 }), // Se valida el password
    check('correo', 'El correo no es valido').isEmail(), // Se valida si lo ingresado es un correo
    check('correo').custom( emailExiste ), // Se valida si el correo ya está registrado en la DB
    check('rol').custom( esRoleValido ), // Se valida el rol
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']), // Se valida el rol
    validarCampos
], 
usuariosPost ); // Antes de hacer la solicitud, se validan los campos

// Peticion put "Actualizar". Se llama al controlador
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(), // Se valida si el id es valido
    check('id').custom( existeUsuarioPorId ), // Se valida el id existe en la DB
    check('rol').custom( esRoleValido ), // Se valida el rol
    validarCampos
] ,
usuariosPut ); // Ahora debe recibir siempre un id. Sale error si no se envia un id

// Peticion delete "Eliminar". Se llama al controlador
router.delete('/:id', [
    esAdminRole, // Valida que el usuario debe ser administrador
    tieneRoles('ADMIN_ROLE, VENTAS_ROLE'), // Valida que el usuario tenga uno de los dos roles
    validarJWT, // Se valida el jwt
    check('id', 'No es un id valido').isMongoId(), // Se valida si el id es valido
    check('id').custom( existeUsuarioPorId ), // Se valida el id existe en la DB
    validarCampos
], 
usuariosDelete );

module.exports = router;