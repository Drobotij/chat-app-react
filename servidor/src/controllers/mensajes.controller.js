const Mensaje = require('../models/Mensaje');
const Usuario = require('../models/Usuario');
const Chat = require('../models/Chat');

exports.crearMensaje = async (req, res) => {

    try {
        
        const { idChat, contenido } = req.body;
        const { id } = req.usuario;
        
        // El contenido es vacio?
        if(contenido.trim().length === 0){
            return res.status(400).json({msg: "El mensaje no puede estar vacio"});
        }

        // Existe el chat?
        const existeChat = await Chat.findById(idChat);
        if(!existeChat) {
            return res.status(400).json({msg: "El chat no existe"});
        }
        
        // Esta el usuario en el chat?
        const esParticipante = await Chat.find({$and : [ { _id: idChat }, { $or: [ { usuarioCreador: id }, { SegundoUsuario: id } ] } ] } );
        if(!esParticipante){
            return res.status(403).json({msg: "No autorizado"});
        }

        // Busca el usuario para crear los datos del mensaje
        const usuario = await Usuario.findById(id);

        // Crea el mensaje
        const mensaje = await Mensaje.create({
            chat: idChat,
            nombreUsuario: `${usuario.nombre} ${usuario.apellido}`,
            idUsuario: id,
            contenido
        })

        // Guarda el mensaje
        await mensaje.save();

        return res.status(201).json(mensaje);

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Ha ocurrido un error en el servidor"});
    }

};

exports.obtenerMensajes = async (req,res) => {

    try {
        
        const { idChat } = req.params;
        const { id } = req.usuario;
        
        // Esta el usuario en el chat?
        const esParticipante = await Chat.find({$and : [ { _id: idChat }, { $or: [ { usuarioCreador: id }, { SegundoUsuario: id } ] } ] } );
        if(!esParticipante){
            return res.status(403).json({msg: "No autorizado"});
        }

        const mensajes = await Mensaje.find({chat: idChat}).sort({ date: 1 });

        return res.status(200).json(mensajes);

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Ha ocurridó un error en el servidor"});
    }

};