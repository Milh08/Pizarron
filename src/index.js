const express = require('express')
const path = require('path');
const SocketIO = require('socket.io');
const http = require('http');

// INICIALIZACION
const app = express()
const server = http.createServer(app);
const io = SocketIO(server);

// AJUSTES
app.set('port', process.env.PORT || 3000);

// MIDDLEWARES

// SOCKETS
require('./sockets')(io);

// ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public'))); // __dirname trae toda la ruta del archivo

// INICIALIZACION DEL SERVIDOR
server.listen(app.get('port'), () =>{
    console.log('Server on port 3000');
});