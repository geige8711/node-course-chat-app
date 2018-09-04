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
    });
    // socket.emit('newEmail',{
    //     from: 'mike@example.com',
    //     text: 'Hey. What is going on.',
    //     createdAt: 123
    // });
    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });
    // socket.emit('newMessage', {
    //     from: 'John',
    //     text: 'See you then',
    //     createdAt: 123123
    // });
});



server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});