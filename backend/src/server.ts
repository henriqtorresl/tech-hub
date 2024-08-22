import { Server } from 'socket.io';
import express, { Application } from 'express';
import http from 'http';

class App {

    private app: Application;
    private http: http.Server;
    private io: Server;

    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http);

        this.listenServer();
        this.listenSocket();
    }

    listenServer(): void {
        this.http.listen(3000, () => {
            console.log('Server is running: http://localhost:3000');
        });
    }

    listenSocket(): void {
        this.io.on('connection', (socket) => {
            console.log('user connected =>', socket.id);

            socket.on('message', (msg) => {
                console.log(msg);
                this.io.emit('message', msg);
            });
        });
    }

}

const server = new App();