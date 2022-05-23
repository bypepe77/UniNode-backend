class Sockets {

    constructor( io ){
        this.io = io;

        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', ( socket ) => {
            console.log("cliente conectado", socket.id );
            
            socket.emit('mensaje-bienvenida', {msg: "bienvenido al server", fecha: new Date()});
            socket.on('message', (data) => { console.log(data) });
        
        });
    }
}

module.exports = Sockets;