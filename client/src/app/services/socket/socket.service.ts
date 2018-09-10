import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class SocketService {

  private url: string;
  private socket;

  constructor() {
    this.url = environment.socketUrl;
    this.socket = io(this.url);
  }

  public logUser(user) {
    this.socket.emit('log user', user);
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public sendMessage(data) {
    this.socket.emit('new message', data);
  }

  public startGame () {
    this.socket.emit('start game');
  };

  public timeUp () {
    this.socket.emit('time up')
  }

  public changeUserStatus () {
    this.socket.emit('change player status')
  }

  public joinQueue() {
    this.socket.emit('join queue')
  }

  public leaveQueue() {
    this.socket.emit('leave queue')
  }

  public getPlayerData() {
    return Observable.create((observer) => {
      this.socket.on('player status changed', (player) => {
        observer.next(player);
      })
    })
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new room message', (message) => {
        observer.next(message);
      });
    });
  };

  public getUsers = () => {
    return Observable.create((observer) => {
      this.socket.on('update users list', (data) => {
        observer.next(data);
      })
    })
  };


  public userJoined = () => {
    return Observable.create((observer) => {
      this.socket.on('user joined', (data) => {
        observer.next(data);
      })
    })
  };

  public allReady = () => {
    return Observable.create((observer) => {
      this.socket.on('all ready', (data) => {
        observer.next(data);
      })
    })
  };

  public gameStatus = () => {
    return Observable.create((observer) => {
      this.socket.on('game status changed', (data) => {
        observer.next(data);
      })
    })
  };

}
