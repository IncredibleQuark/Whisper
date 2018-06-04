import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameService {

  private url: string;
  private socket;

  constructor() {
    this.url = environment.socketUrl;
    this.socket = io(this.url);
  }

  public getUsers = () => {
    return Observable.create((observer) => {
      this.socket.on('update users list', (data) => {
        observer.next(data);
      })
    })
  };

}
