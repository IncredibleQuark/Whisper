import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game/game.service";

@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.css']
})
export class RoomMenuComponent implements OnInit {

  usersList: Array<string>;
  usersCount: number;

  constructor(private gameService: GameService) {
    this.gameService.getUsers().subscribe( data => {

      this.usersList = data.usersArray;
      this.usersCount = data.usersCount;

      console.warn(this.usersList);
    })
  }

  ngOnInit() {
  }

  updateRank() {

  }

}
