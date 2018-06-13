import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game/game.service";
import {AuthService} from "../../services/auth/auth.service";

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

  constructor(private gameService: GameService, private authService: AuthService) {

    this.isReady = false;
    this.allReady = false;

    this.isDrawing = true; //TODO create a queue

    this.gameService.gameStatus().subscribe((slogan: string) => {
      this.slogan = slogan;
      this.gameStarted = true;
    });

    this.authService.getProfile().subscribe( (user: any) => {
      this.user = user.user;
    });

    this.gameService.allReady().subscribe( (data: boolean) => {
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

}
