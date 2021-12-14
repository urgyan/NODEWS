

module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){  
        console.log('new connection received', socket.id);   // io.socket.on fires a ack  as connection recived to connecthandeler in chat_engine;

        socket.on('disconnect', function(){
            console.log('socket disconnected!');  // io.socket.on fires a  disconnection event automatical wenenver client disconnect
        });

        
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            socket.join(data.chatroom); // user will join the room 

            io.in(data.chatroom).emit('user_joined', data); // this notify other user that current user has joined the room 
        });

        //  detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });


    });

}