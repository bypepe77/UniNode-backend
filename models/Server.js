const express  = require('express');
const http     = require('http')
const socketIo = require('socket.io');
const path     = require('path');
const Sockets  = require('./sockets');
const cors     = require('cors');
const cron       = require('node-cron');
const CronClass  = require('../classes/Cron');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server)

        dbConnection();
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')))

        // CORS
        this.app.use( cors() )

        this.app.use( express.json() )

        this.app.use( '/api/login', require('../router/auth'));
        this.app.use( '/api/profile', require('../router/profile'));
        this.app.use( '/api/posts', require('../router/posts'));
        this.app.use( '/api/follow', require('../router/follow'));
    }

    socketConfiguration(){
        new Sockets( this.io )

    }

    cronJobs(){
        const Cron = new CronClass();

        cron.schedule('* * * * *', () => {
            Cron.updatePostWithTop();
        });

    }

    execute(){
        // Execute All middlewares
        this.middlewares();

        // Execute Socket Configuration
        this.socketConfiguration();

        //Execute Cron Jobs
        this.cronJobs();

        // Start Server
        this.server.listen(this.port, () => {
            console.log("Listening on port ", this.port)
        })
    }

}

module.exports = Server