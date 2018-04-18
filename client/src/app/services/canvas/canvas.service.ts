import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as io from 'socket.io-client';
import {environment} from "../../../environments/environment";


@Injectable()
export class CanvasService {

  private socket;
  private url: string;

  constructor() {
    this.url = environment.socketUrl;
    this.socket = io(this.url);
  }


  public canvasUpdate = () => {
    return Observable.create((observer) => {
      this.socket.on('drawing', (data) => {
        observer.next(data);
      });
    });
  };

  public draw (prevPos, currentPos, color) {
    let data = {prevPos: prevPos, currPos: currentPos, color: color};
    this.socket.emit('drawing', data);
  };

}
