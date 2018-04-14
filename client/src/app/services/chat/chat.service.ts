import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatService {

  private url = 'ggg';
  private socket;

  constructor() {
    this.url = environment.socketUrl;
    this.socket = io(this.url);
  }

  public logUser(username) {

    this.socket.emit('add user', username);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-global-message', (message) => {
        console.warn(message);
        observer.next(message);
      });
    });
  }


}
