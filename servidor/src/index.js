const express = require('express');
const app = express();
const conectarDB = require('./config/database');
const cors = require('cors');

// Conecta la base de datos
conectarDB();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {

    cors : {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }

});



app.set('port', process.env.PORT || 4000);

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static(__dirname + '/source'));
// Configurando cors
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Routes
app.use('/api/chats', require('./routes/chats.route'));
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/mensajes', require('./routes/mensajes.route'));

// Socket io
let usuarios = {};

io.on('connection', socket => {

    socket.on('nuevo usuario', (datos) => {
        
        if (datos in usuarios) return
    
        socket.nickname = datos;
        usuarios[socket.nickname] = socket;
        
    });

    socket.on('nuevo mensaje', (otroUsuarioId, idChat) => {
        if(!usuarios[otroUsuarioId]) return;

        usuarios[otroUsuarioId].emit('obtener mensajes', idChat);
    })

    socket.on('disconnect',() => {
        
        delete usuarios[socket.nickname];
       
    });

});

server.listen(app.get('port'), () => console.log('Server en puerto: '+ app.get('port')));