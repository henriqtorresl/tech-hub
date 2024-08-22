import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Manager, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private readonly api: string = environment.api;
  private manager: Manager = new Manager(this.api);
  private socket: Socket = this.manager.socket('/'); // main namespace

  constructor() {
    this.listenForMessages();
  }

  messageEvent(msg: any): void {
    this.socket.emit('message', msg);
  }

  listenForMessages(): void {
    this.socket.on('message', (msg: any) => {
      console.log('Message received: ', msg);
    });
  }

}