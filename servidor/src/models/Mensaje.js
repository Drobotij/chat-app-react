const mongoose = require('mongoose');
const date = new Date();

const MensajeSchema = mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha: {
        type: String,
        default: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    },
    hora: {
        type: String,
        default: `${date.getHours()}:${date.getMinutes()}`
    },
    contenido: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }


});

module.exports = mongoose.model('Mensaje', MensajeSchema);