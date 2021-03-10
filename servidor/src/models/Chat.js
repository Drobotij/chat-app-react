const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    usuarioCreador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    segundoUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    date: {
        type: Date,
        default: Date.now()
    }
   
});

module.exports = mongoose.model('Chat', ChatSchema)