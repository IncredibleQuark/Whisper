
import {fromEvent as observableFromEvent, Observable} from 'rxjs';

import {takeUntil, pairwise, switchMap} from 'rxjs/operators';
import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {CanvasService} from '../../services/canvas/canvas.service';
import {SocketService} from '../../services/socket/socket.service';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  @ViewChild('canvas') public canvas: ElementRef;
  // setting a width and height for the canvas
  @Input() public width = 700;
  @Input() public height = 400;

  @Output() public toggleList = new EventEmitter();

  private context: CanvasRenderingContext2D;
  private canvasEl: HTMLCanvasElement;
  private color: string;
  public isDrawing: boolean;
  public gameStarted: boolean;
  public lineWidth: number;

  constructor(private canvasService: CanvasService, private socketService: SocketService) {
  }

  ngOnInit() {
    this.canvasEl = this.canvas.nativeElement;

    this.color = '#000000';
    this.lineWidth = 5;
    this.canvasService.canvasUpdate().subscribe((data) => {
      this.drawOnCanvas(data.prevPos, data.currPos, true, data.color, data.lineWidth);
    });

    this.socketService.getPlayerData().subscribe( (response) => {
      this.isDrawing = response.user.isDrawing;
    });

    this.socketService.gameStatus().subscribe((data: any) => {
      this.gameStarted = data.gameStatus === 'game started';
      this.clearBoard();
      this.captureEvents();
      this.captureMobileEvents();
    });

    this.canvasService.resetUpdate().subscribe(() => {
      this.clearBoard();
    });

  }

  ngAfterViewInit() {
    // get the context
    this.context = this.canvasEl.getContext('2d');
    // set the width and height
    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;
    // set some default properties about the line
    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = 'round';
    this.context.strokeStyle = this.color;

    // methods to start capturing mouse and touch events
    this.captureEvents();
    this.captureMobileEvents();
  }

  public toggleUsersList() {
    this.toggleList.emit();
  }


  public changeColor(color) {
    if (this.isDrawing && this.gameStarted) {
      this.color = color;
    }
  }


  public resetCanvas() {
    if (this.isDrawing && this.gameStarted) {
      this.canvasService.resetExecute();
    }
  }


  private clearBoard() {
    this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }


  captureEvents() {

    const eventsObservable = observableFromEvent(this.canvasEl, 'mousedown').pipe(
      switchMap((e) => {

        e.preventDefault();

        return observableFromEvent(this.canvasEl, 'mousemove').pipe(
          // we'll stop (and unsubscribe) once the user releases the mouse
          // this will trigger a 'mouseup' event
          takeUntil(observableFromEvent(this.canvasEl, 'mouseup')),
          // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
          takeUntil(observableFromEvent(this.canvasEl, 'mouseleave')),
          // pairwise lets us get the previous value to draw a line from
          // the previous point to the current point
          pairwise(), );
      }))
      .subscribe((res: [MouseEvent, MouseEvent]) => {

        if (!this.isDrawing || !this.gameStarted) {
          eventsObservable.unsubscribe();
          return;
        }

        const rect = this.canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.drawOnCanvas(prevPos, currentPos, false);
      });
  }


  drawOnCanvas(prevPos: { x: number, y: number },
               currentPos: { x: number, y: number },
               emit,
               color = null,
               lineWidth = null) {

    if (!this.context) {
      return;
    }

    this.context.beginPath();
    if (color) {
      this.context.strokeStyle = color;
    } else {
      this.context.strokeStyle = this.color;
    }

    if (lineWidth) {
      this.context.lineWidth = lineWidth;
    } else {
      this.context.lineWidth = this.lineWidth;
    }

    if (prevPos) {

      this.context.moveTo(prevPos.x, prevPos.y);
      this.context.lineTo(currentPos.x, currentPos.y);
      this.context.stroke();

      if (!emit) {
        this.canvasService.draw(prevPos, currentPos, this.color, this.lineWidth);
      }
    }
  }


  private captureMobileEvents() {

    const eventsObservable = observableFromEvent(this.canvasEl, 'touchstart').pipe(
      switchMap((e: any) => {

        e.preventDefault();

        return observableFromEvent(this.canvasEl, 'touchmove').pipe(
          takeUntil(observableFromEvent(this.canvasEl, 'touchup')),
          pairwise(), );
      })).subscribe((res: [TouchEvent, TouchEvent]) => {

      if (!this.isDrawing || !this.gameStarted) {
        eventsObservable.unsubscribe();
        return;
      }

      const rect = this.canvasEl.getBoundingClientRect();

      const prevPos = {
        x: res[0].targetTouches[0].clientX - rect.left,
        y: res[0].targetTouches[0].clientY - rect.top
      };

      const currentPos = {
        x: res[1].targetTouches[0].clientX - rect.left,
        y: res[1].targetTouches[0].clientY - rect.top
      };

      this.drawOnCanvas(prevPos, currentPos, false);

    });
  }

}
