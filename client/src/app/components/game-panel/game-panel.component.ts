import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {IUser} from "../../interfaces/user.interface";
import {IApiResponse} from "../../interfaces/apiResponse.interface";
import {SocketService} from "../../services/socket/socket.service";

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {

  slogan: string;
  isReady: boolean;
  allReady: boolean;
  isDrawing: boolean;
  isInQueue: boolean;
  gameStarted: boolean;
  gameStatus: string;
  user: IUser;
  time: Date;
  timeObservable: Subscription;

  constructor(private socketService: SocketService, private authService: AuthService) {

    this.isReady = false;
    this.allReady = false;
    this.isDrawing = true;
    this.isInQueue = false;
    this.gameStatus = 'Waiting for players';
    this.resetTime();
    this.socketService.gameStatus().subscribe((data: any) => {
console.log(data);
      this.gameStatus = data.status;

      if (this.gameStatus === 'game started') {
        this.startTimer();
        this.slogan = data.slogan;
        this.gameStarted = true;
        this.isDrawing = true;
        this.changeUserStatus()
      } else {
        this.stopTimer();
        this.resetTime();
        this.slogan = null;
        this.gameStarted = false;
      }

    });

    this.authService.getProfile().subscribe((response: IApiResponse<IUser>) => {
      this.user = response.data;
    });

    this.socketService.allReady().subscribe((data: boolean) => {
      this.allReady = data;
    })
  }

  ngOnInit() {
  }

  resetTime() {
    this.time = new Date('2018-01-01 00:02:00');
  }

  changeUserStatus() {
    this.isReady = !this.isReady;
    const data = {user: this.user, isReady: this.isReady, isDrawing: this.isDrawing};
    this.socketService.changeUserStatus(data);
  }

  joinQueue() {

  }

  startGame() {
    this.socketService.startGame();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private startTimer() {
    let tick = TimerObservable.create(1000, 1000);

    this.timeObservable = tick.subscribe((t: number) => {

      if (this.time.getMinutes() === 0 && this.time.getSeconds() === 0) {
        console.warn('time is up');
        this.stopTimer();
        this.socketService.timeUp();
      }

      this.time = new Date(this.time.getTime() - 1000);
    });

  }

  private stopTimer() {
    if (this.timeObservable) {
      this.timeObservable.unsubscribe();
    }
  }

}
