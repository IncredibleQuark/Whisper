import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class ChatService {

  private url: string;
  private socket;

  constructor() {
    this.url = environment.socketUrl;
    this.socket = io(this.url);
  }

  public logUser(user) {
    this.socket.emit('log user', user);
  }

  public sendMessage(data) {
    this.socket.emit('new message', data);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new room message', (message) => {
        observer.next(message);
      });
    });
  };




}
