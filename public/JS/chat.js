let socket = io();

function scrollToBottom () {
    //selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    console.log('Connected to server');
    let params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
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
        let formattedTime = moment(message.createdAt).format('h:mm a');
        let template = jQuery('#message-template').html();
        let html = Mustache.render(template,{
            text: message.text,
            from: message.from,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
    //     console.log('New Message',message);
    //     let formattedTime = moment(message.createAt).format('h:mm a');
    //     let li = jQuery('<li></li>');
    //     li.text(`${message.from} ${formattedTime}: ${message.text}`);
    //
    //     jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage', function (message) {
        let formattedTime = moment(message.createdAt).format('h:mm a');
        let template = jQuery('#location-message-template').html();
        let html = Mustache.render(template, {
            from: message.from,
            url: message.url,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
        // let li = jQuery('<li></li>');
        // let a = jQuery('<a target="_blank">My current location</a>');
        //
        // li.text(`${message.from} ${formattedTime}: `);
        // a.attr('href', message.url);
        // li.append(a);
        // jQuery('#messages').append(li);
    });

});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        jQuery('[name=message]').val('')
    })
});
let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});

socket.on('disconnect', () => {

});

socket.on('updateUserList', function(users){
    // console.log('Users list', users);
    let ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});
// socket.on('newEmail', (email)=>{
//     console.log('New email',email);
// });
// socket.emit('createEmail',{
//     to: 'jen@example.com',
//     text: 'Hey. This is Andrew.'
// });
