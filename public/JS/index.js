let socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
    // socket.emit('createMessage',{
    //     from: 'Andrew',
    //     text: 'Yup, that works for me.'
    // });
    // socket.emit('createMessage', {
    //     from: 'Frank',
    //     text: 'Hi'
    // }, function (data) {
    //     console.log('Got it', data);
    // });
    socket.on('newMessage', (message)=>{
        console.log('New Message',message);
        let li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);

        jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage', function (message) {
        let li = jQuery('<li></li>');
        let a = jQuery('<a target="_blank">My current location</a>');

        li.text(`${message.from}: `);
        a.attr('href', message.url);
        li.append(a);
        jQuery('#messages').append(li);
    });

});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    })
});
let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
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
