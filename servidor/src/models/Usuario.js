const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: ``
    }
});

UsuarioSchema.pre('save', async function(next) {

    try {
        this.foto = `http://localhost:4000/${path.join('/usersImg')}/${this._id}/FotoPerfil.png`;

        const salt = await bcrypt.genSalt(10);
       
        this.password = await bcrypt.hash(this.password, salt);
        
        next();

    } catch (error) {
        
        console.log(error);
        return;
    
    }

});

UsuarioSchema.methods.comparePassword = async function(password) {

    // Revisa que el password sea correcto
    return await bcrypt.compare(password, this.password); 
    

};

module.exports = mongoose.model('Usuario', UsuarioSchema)