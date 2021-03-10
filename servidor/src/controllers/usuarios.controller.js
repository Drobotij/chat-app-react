const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

exports.crearUsuarios = async (req, res) => {

    try {
        // Obtiene los datos de la req
        const { email, password, confirmar, nombre, apellido, nombreUsuario } = req.body;

        // Chequea si el email esta en uso
        const existeUsuario = await Usuario.findOne({email});
        if(existeUsuario){
            return res.status(400).json( { detalles: [ { msg: "El email ya esta en uso" } ], tipo: 'error' });
        }

        // Chequea el nombre de usuario
        const existeUser = await Usuario.findOne({nombreUsuario});
        if(existeUser){
            return res.status(400).json( { detalles: [ { msg: "El usuario ya esta en uso" } ], tipo: 'error' })
        }

        if(password !== confirmar){
            return res.status(400).json( { detalles: [ { msg: "Las contraseñas no coinciden" } ], tipo: 'error' });
        }

        // Crea el usuario
        const usuario = await Usuario({
            nombre,
            apellido,
            email,
            password,
            nombreUsuario
        });

        // Guarda el usuario en la base
        await usuario.save();

        // Crea la carpeta donde se va a guardar la foto de perfil
        fs.mkdirSync(path.join(__dirname, '../source', 'usersImg', usuario._id.toString()), function(err) { 
            console.log(err);
        });

        fs.copyFileSync(

            path.join(__dirname, '../source', 'usersImg', 'nuevoUsuario.png'), 
            path.join( __dirname, '../source', 'usersImg', usuario._id.toString(), '/FotoPerfil.png')
        
        );
        
        return res.status(201).json( { detalles: [ { msg: "Usuario creado correctamente" } ], tipo: 'exito' });

    } catch (error) {
        console.log(error);
        return res.status(500).json( { detalles: [ { msg: "Ha ocurrido un error inesperado, por favor intente mas tarde." } ], tipo: 'error' });
    }

};

exports.autenticarUsuario = async (req, res) => {

    try {
        
        const { email, password } = req.body;
        
        // Chequea si el email esta en uso
        const existeUsuario = await Usuario.findOne({email});
        if(!existeUsuario){
            return res.status(400).json( { detalles: [ { msg: "El email no esta registrado" } ], tipo: 'error' });
        }
        
        const passCorrecto = await existeUsuario.comparePassword(password);
        
        if(!passCorrecto){
            return res.status(400).json( { detalles: [ { msg: "Contraseña incorrecta" } ], tipo: 'error' });
        }
        
        // Creando el jsonwebtoken
        const payload = {
            usuario:{
                id: existeUsuario._id
            }
        };

        // Firmando el token
        jwt.sign(payload, "dundermifflin", {
            expiresIn: 3600
        }, (error, token) => {
            if(error){
                return res.status(500).json( { detalles: [ { msg: "Ha ocurrido un error inesperado, por favor intente mas tarde." } ], tipo: 'error' });
            };

            return res.status(200).json({

                detalles: [ { msg: "Sesion iniciada correctamente." } ], 
                tipo: 'exito',
                datos: { token, usuario: existeUsuario } 
            
            });
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json( { detalles: [ { msg: "Ha ocurrido un error inesperado, por favor intente mas tarde." } ], tipo: 'error' });

    }
    
};

exports.obtenerUsuario = async (req, res) => {

    try {
        
        const usuario = await Usuario.findById(req.usuario.id);
        return res.status(200).json({

            detalles:null, 
            tipo: null,
            datos: { usuario } 
        
        });

    } catch (error) {
        console.log(error);
        res.status(500).json( { detalles: [ { msg: "Ha ocurrido un error inesperado, por favor intente mas tarde." } ], tipo: 'error' });
    }

};

exports.almacenarFoto = (req, res) => {
   
    res.status(200).json( { detalles: [ { msg: "Se ha actualizado la foto de perfil correctamente" } ], tipo: 'exito' });
}