const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


let app = express();
let server = http.createServer(app);
let io = socketIO(server);
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


console.log(__dirname + '/../public');
console.log(publicPath);



io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', ()=>{
        console.log('user is not connected');
    })
});



server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});