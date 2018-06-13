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
  user: any;

  constructor(private gameService: GameService, private authService: AuthService) {
  }

  ngOnInit() {
    this.isReady = false;
    this.allReady = false;

    this.gameService.gameStatus().subscribe((slogan: string) => {
      this.slogan = slogan;
    });

    this.authService.getProfile().subscribe( (user: any) => {
      this.user = user.user;
    })
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
