import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =  'http://localhost:82';

export const socket = io(URL);

socket.on('connect', function() {
    console.log('Connected');
    alert(123)
    socket.emit('events', { test: 'test' });
    socket.emit('identity', 0, (response: any) =>
        console.log('Identity:', response),
    );
});
socket.on('events', function(data) {
    console.log('event', data);
});
socket.on('exception', function(data) {
    console.log('event', data);
});
socket.on('disconnect', function() {
    console.log('Disconnected');
});