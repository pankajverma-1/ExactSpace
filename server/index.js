const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 4000;

const http = require('http').Server(app);
app.use(cors());

//api
app.get('/api', (req, res) => {
    res.json({ message: 'pankaj' });
});

// import socket.io and Initialize
let users = [];

const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

socketIO.on('connection', (socket) => {
    // console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
        // console.log('🔥: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);

        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});

//create server
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});