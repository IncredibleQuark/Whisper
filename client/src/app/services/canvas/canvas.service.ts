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
      this.socket.on('drawing', (coords) => {
        observer.next(coords);
      });
    });
  };

  public draw (prevPos, currentPos) {
    let pos = {pr: prevPos, cr: currentPos};
    this.socket.emit('drawing', pos);
  };

}
