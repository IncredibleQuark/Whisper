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
  queue: number;
  user: IUser;
  time: Date;
  timeObservable: Subscription;

  constructor(private socketService: SocketService, private authService: AuthService) {

    this.isReady = false;
    this.allReady = false;
    this.isInQueue = false;
    this.gameStatus = 'Waiting for players';

    this.resetTime();

    this.socketService.gameStatus().subscribe((data: any) => {

      this.gameStatus = data.gameStatus;

      if (this.gameStatus === 'game started' && data.slogan) {
        this.startTimer();
        this.slogan = data.slogan;
        this.gameStarted = true;
      } else {
        this.stopTimer();
        this.resetTime();
        this.slogan = null;
        this.gameStarted = false;
      }
      this.changePlayerStatus();
    });

    this.socketService.getPlayerData().subscribe( (response) => {
      this.isDrawing = response.user.isDrawing;
      this.isInQueue = response.user.queue ? response.user.queue : false;
      this.queue = response.user.queue || null;
    });

    this.authService.getProfile().subscribe((response: IApiResponse<IUser>) => {
      this.user = response.data;
    });

    this.socketService.allReady().subscribe((data: boolean) => {
      this.allReady = data;
    });
  }

  ngOnInit() {
  }

  resetTime() {
    this.time = new Date('2018/01/01 00:02:00');
  }

  changePlayerStatus() {
    this.socketService.changeUserStatus();
  }

  joinQueue() {
    this.socketService.joinQueue();
  }

  leaveQueue() {
    this.socketService.leaveQueue();
  }

  startGame() {
    this.socketService.startGame();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private startTimer() {
    const tick = TimerObservable.create(1000, 1000);

    this.timeObservable = tick.subscribe((t: number) => {

      if (this.time.getMinutes() === 0 && this.time.getSeconds() === 0) {
        this.stopTimer();
        if (this.isDrawing) {
          this.socketService.timeUp();
        }
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
