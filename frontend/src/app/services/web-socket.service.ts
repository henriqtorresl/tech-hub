import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Manager } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private readonly api: string = environment.api;
  private manager: Manager = new Manager(this.api);
  private socket = this.manager.socket('/'); // main namespace

  constructor() {
    this.socket.on('connect', () => {
      // ...
    });

    this.socket.emit('message', ({teste: 'ola'}));
  }

}
