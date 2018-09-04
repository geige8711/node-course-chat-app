let socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
    // socket.emit('createMessage',{
    //     from: 'Andrew',
    //     text: 'Yup, that works for me.'
    // });
    socket.on('newMessage', (message)=>{
        console.log('New Message',message);
    });
});
socket.on('disconnect', () => {
    console.log('Disconnected to server');
});
// socket.on('newEmail', (email)=>{
//     console.log('New email',email);
// });
// socket.emit('createEmail',{
//     to: 'jen@example.com',
//     text: 'Hey. This is Andrew.'
// });
