const router = require('express').Router();
const { crearUsuarios, autenticarUsuario, obtenerUsuario, almacenarFoto } = require('../controllers/usuarios.controller');
const validarDatos = require('../helpers/ValidarDatos');
const { check } = require('express-validator');
const authJWT = require('../middlewares/auth');
const storageFotoPerfil = require('../config/storageFoto');


router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check("apellido",  'El apellido es obligatorio.').not().isEmpty(),
    check("email", "Ingrese un email valido.").isEmail(),
    check("password", "La contraseña debe ser minima 6 caracteres").isLength({min: 6}),
    check("confirmar", "Ingrese la confirmacion de contraseña").not().isEmpty(),
    check("nombreUsuario", "El usuario es obligatorio").not().isEmpty()
], validarDatos, crearUsuarios);

router.post('/autenticarUsuario', [
    check("email", "Ingrese un email valido.").isEmail(),
    check("password", "El password debe ser minimo 6 caracteres").isLength({min: 6})
], validarDatos, autenticarUsuario);

router.get('/', authJWT, obtenerUsuario);

router.put('/cambiarFoto', authJWT, storageFotoPerfil.single('foto'), almacenarFoto)

module.exports = router;