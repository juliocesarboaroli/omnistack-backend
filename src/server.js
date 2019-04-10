const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Configurando para aceitar protocolo HTTP e WEB SOCKET
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Quando o usuário abrir a aplicação
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-bhrny.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

// Para fazer com que todos os controllers tenham acesso a io
app.use((req, res, next) => {
    req.io = io;
    // Para fazer a requisição passar deste middleware para sua rota correta
    return next;
});

// Todos podem acessar minha aplicação e consultar os recursos dela
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para envio de arquivos

// Quando acessar /files devo buscar os arquivos físicos presentes em tmp
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);
console.log('Rodando na porta 3333')