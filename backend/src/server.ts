import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import routes from './routes/index/routes';

class App {

    private app: Application;
    private http: http.Server;
    private io: Server;

    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(routes);

        this.io = new Server(this.http, {
            cors: {
                credentials: true
            }
        });

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

            // Evento de mensagem:
            socket.on('message', (msg) => {
                console.log(msg)
                this.io.emit('message', msg); // Envia a mensagem para todos os clientes conectados
            });
        });
    }
}

const server = new App();
