const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const router = Router();
//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles'); --> se optimiza con la siguiente instruccion
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');




module.exports = router;


router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'el rol no es rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), validarCampos
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);