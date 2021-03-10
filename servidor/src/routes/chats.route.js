const router = require('express').Router();
const authJWT = require('../middlewares/auth');
const { crearChat, obtenerChats, buscarUsuarios, obtenerParticipantes} = require('../controllers/chats.controller');

// Crea chats
router.post('/', authJWT, crearChat);

// Devuleve los chats
router.get('/', authJWT, obtenerChats);

// Busca usuarios para agregar chats
router.get('/buscarUsuarios', authJWT, buscarUsuarios);

router.get('/obtenerParticipantes/:idChat', authJWT, obtenerParticipantes);

module.exports = router;