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


const nmap = () => {
    const child = spawn('sh', ['-c','/opt/homebrew/bin/nmap 127.0.0.1']);

    child.stdout.on('data', (data) => {
        socket.emit('output', data.toString());
    });

    child.stderr.on('data', (data) => {
        socket.emit('output', `${data}`);
    });
}


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

    io.on('connection', (socket) => {

        socket.on('nmap', () => {
            nmap()
        })

    })

});


server.listen(3000, () => {
    console.log('listening on http://127.0.0.1:3000');
});