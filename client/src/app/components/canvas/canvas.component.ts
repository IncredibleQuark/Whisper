import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import {CanvasService} from "../../services/canvas/canvas.service";

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

  private context: CanvasRenderingContext2D;
  private canvasEl: HTMLCanvasElement;
  private color: string;
  private lineWidth: number;

  constructor(private canvasService: CanvasService) {
  }

  ngOnInit() {
    this.canvasEl = this.canvas.nativeElement;

    this.color = '#000000';
    this.lineWidth = 5;
    this.canvasService.canvasUpdate().subscribe((data) => {
      this.drawOnCanvas(data.prevPos, data.currPos, true, data.color, data.lineWidth);
    });

    this.canvasService.resetUpdate().subscribe(() => {
      this.clearBoard();
    })
  }

  public ngAfterViewInit() {
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


  public changeColor(color) {
    this.color = color;
  }


  public resetCanvas() {
    this.canvasService.resetExecute();
  }


  private clearBoard() {
    this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }


  captureEvents() {
    Observable
    // this will capture all mousedown events from teh canvas element
      .fromEvent(this.canvasEl, 'mousedown')
      .switchMap((e) => {

        return Observable
        // after a mouse down, we'll record all mouse moves
          .fromEvent(this.canvasEl, 'mousemove')
          // we'll stop (and unsubscribe) once the user releases the mouse
          // this will trigger a 'mouseup' event
          .takeUntil(Observable.fromEvent(this.canvasEl, 'mouseup'))
          // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
          .takeUntil(Observable.fromEvent(this.canvasEl, 'mouseleave'))
          // pairwise lets us get the previous value to draw a line from
          // the previous point to the current point
          .pairwise()
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
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

        // this method we'll implement soon to do the actual drawing
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

    Observable
      .fromEvent(this.canvasEl, 'touchstart')
      .switchMap((e: any) => {

        e.preventDefault();

        return Observable
          .fromEvent(this.canvasEl, 'touchmove')
          .takeUntil(Observable.fromEvent(this.canvasEl, 'touchup'))
          .pairwise()
      }).subscribe((res: [TouchEvent, TouchEvent]) => {
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
  };

}
