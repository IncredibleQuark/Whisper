import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game/game.service";
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs/Subscription";
import {TimerObservable} from "rxjs/observable/TimerObservable";

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
  gameStarted: boolean;
  user: any;
  time: Date;
  timeObservable: Subscription;

  constructor(private gameService: GameService, private authService: AuthService) {

    this.isReady = false;
    this.allReady = false;
    this.isDrawing = true; //TODO create a queue
    this.time = new Date('2018-01-01 00:02:00');

    this.gameService.gameStatus().subscribe((slogan: string) => {
      this.slogan = slogan;
      this.gameStarted = true;
      this.startTimer();
    });

    this.authService.getProfile().subscribe((user: any) => {
      this.user = user.user;
    });

    this.gameService.allReady().subscribe((data: boolean) => {
      this.allReady = data;
    })
  }

  ngOnInit() {
  }

  test() {
    this.isReady = !this.isReady;
    const data = {user: this.user, isReady: this.isReady};
    this.gameService.changeStatus(data);
  }

  startGame() {
    this.gameService.startGame();
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
        return false;
        //TODO handle sockets
      }

      this.time = new Date(this.time.getTime() - 1000);
    });

  }

  private stopTimer() {
    this.timeObservable.unsubscribe();
  }

}
