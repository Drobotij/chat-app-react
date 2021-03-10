const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {

        const destino = `${__dirname}/../source/usersImg/${req.usuario.id.toString()}/`
    
        cb(null, destino)
    },
    filename: function(req, file, cb) {
        file.originalname = 'FotoPerfil.png';
        
        cb(null, file.originalname);
    }
  });
  
  const storageFotoPerfil = multer({ storage });

  module.exports = storageFotoPerfil;