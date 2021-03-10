const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{

    // Leer el token del header
    const token = req.header('x-auth-token');
    
    // Revisar si no hay token
    if(!token) {
        return res.status(401).json( { detalles: [ { msg: "No hay token." } ], tipo: 'error' });
    }

    // Validar el token
    try {
        
        const cifrado = jwt.verify(token, "dundermifflin");
        req.usuario = cifrado.usuario;
        next();
        
    } catch (error) {
        return res.status(401).json( { detalles: [ { msg: "No hay token." } ], tipo: 'error' });
    }
    
};