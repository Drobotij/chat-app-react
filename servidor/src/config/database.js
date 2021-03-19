const mongoose = require('mongoose');

const conectarDB = async () =>{
    
    try {
        await mongoose.connect('****', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
    }

}


module.exports = conectarDB;