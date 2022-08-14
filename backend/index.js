const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server);
const {
    spawn
} = require('child_process');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



app.get('/test', (req, res) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });

        const child = spawn('find', ['.']);
        child.stdout.on('data', (data) => {
            io.emit('find result', `\n${data}`);
        });

        child.on('close', (code) => {
            io.emit('find result', `child process exited with code ${code}`);
        });

    });

    res.sendFile(__dirname + '/index.html');
});



server.listen(3000, () => {
    console.log('listening on http://127.0.0.1:3000');
});