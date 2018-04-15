import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat/chat.service";

@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.css']
})
export class RoomMenuComponent implements OnInit {

  private usersList: Array<string>;
  private usersCount: number;

  constructor(private chatService: ChatService) {
    this.chatService.getUsers().subscribe( data => {
      console.log(data);
      this.usersList = data.usersArray;
      this.usersCount = data.usersCount;
    })
  }

  ngOnInit() {
  }

}
