const { validationResult } = require('express-validator');

module.exports = ValidarDatos = (req, res, next) => {

    // Revisa si hay error de validacion
    const errores = validationResult(req);
    
    if(!errores.isEmpty()){
        return res.status(400).json({detalles: errores.array(), tipo: 'error'});
    }
    next();

};