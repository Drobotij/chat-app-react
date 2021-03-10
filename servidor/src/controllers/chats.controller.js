const Chat = require('../models/Chat');
const Usuario = require('../models/Usuario');

exports.crearChat = async (req, res) => {

    try {

        const { segundoUsuario } = req.body;
        const usuarioCreador = req.usuario.id;
       
        // Existe el segundo usuario?
        const existeSegudoUsuario = Usuario.findById(segundoUsuario);
        if(!existeSegudoUsuario) {
            return res.status(500).json( { detalles: [ { msg: "El usuarios que intenta contactar no existe." } ], tipo: 'error' });
        }

        // Crea el chat
        const chat = await Chat({
            usuarioCreador,
            segundoUsuario
        });

        // Guarda el chat
        await chat.save();

        // Envia el chat creado
        return res.status(200).json({

            detalles: [ { msg: "Chat agregado correctamente" } ], 
            tipo: 'exito',
            datos: { chat } 
        
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json( { detalles: [ { msg: "Ha ocurrido un error inesperado, por favor intente mas tarde." } ], tipo: 'error' });
    }

};

exports.obtenerChats = async (req, res) =>{

    try {
        
        const { id } = req.usuario;

        // Busca los chats por los dos campos donde se puede encontrar
        // la id del usuario
        const chats = await Chat.find( {$or: [ { usuarioCreador: id }, { segundoUsuario: id } ] });
        
        return res.status(200).json({

            detalles: null,
            datos: { chats: chats } 
        
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json( { detalles: [ { msg: "Ha ocurrido un error inesperado, por favor intente mas tarde." } ], tipo: 'error' });
    }
    
};

exports.buscarUsuarios = async (req, res) => {

    try {   

        const { busqueda } = req.query;
        
        const usuariosEncontrados = await Usuario.find({ nombreUsuario: { $regex: busqueda } });

        if(usuariosEncontrados.length === 0){
            return res.status(404).json( { detalles: [ { msg: "No hay resultados." } ], tipo: 'regular' });
        }

        return res.status(200).json({

            detalles: null,
            datos: { usuarios: usuariosEncontrados } 
        
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json( { detalles: [ { msg: "Ha ocurrido un error inesperado, por favor intente mas tarde." } ], tipo: 'error' });

    }

};

exports.obtenerParticipantes = async (req,res) => {

    try {
        

        const { idChat } = req.params;
        const id = req.usuario.id;
        

        // Esta el usuario en el chat?
        const esParticipante = await Chat.find({$and : [ { _id: idChat }, { $or: [ { usuarioCreador: id }, { segundoUsuario: id } ] } ] } );
        if(!esParticipante){
            return res.status(403).json({msg: "No autorizado"});
        }
        
        let idUsuario; 
        if(esParticipante[0].usuarioCreador.toString() === id.toString()){
            idUsuario = esParticipante[0].segundoUsuario;
        }else {
            idUsuario = esParticipante[0].usuarioCreador;
        }

        const datosUsuario = await Usuario.findById(idUsuario).select('-password');
        
        return res.status(200).json(datosUsuario);

    } catch (error) {

        console.log(error);
        return res.status(500).json( { detalles: [ { msg: "Ha ocurrido un error inesperado, por favor intente mas tarde." } ], tipo: 'error' });

    }

}