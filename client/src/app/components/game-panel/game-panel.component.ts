import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game/game.service";

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {

  slogan: string;
  isReady: boolean;
  allReady: boolean;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.isReady = false;
    this.allReady = false;

    this.gameService.gameStatus().subscribe((slogan: string) => {
      console.warn(slogan);
      this.slogan = slogan;
    })
  }

  test() {
    this.isReady = !this.isReady;

    const data = {user: '', isReady: this.isReady};
    this.gameService.changeStatus(data);
  }

  startGame() {
    this.gameService.startGame();
  }

}
