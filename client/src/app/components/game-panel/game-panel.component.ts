import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game/game.service";

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {

  private slogan: string;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.gameStatus().subscribe( (slogan: string) => {
      console.warn(slogan);
      this.slogan = slogan;
    })
  }

  startGame() {
    this.gameService.startGame();
  }

}
