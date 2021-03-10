const router = require('express').Router();
const { crearMensaje, obtenerMensajes } = require('../controllers/mensajes.controller');
const authJWT = require('../middlewares/auth');

// Añade un mensaje
router.post('/', authJWT, crearMensaje);

// Obtiene los mensajes dependiendo el id del chat
router.get('/:idChat', authJWT, obtenerMensajes);


module.exports = router;