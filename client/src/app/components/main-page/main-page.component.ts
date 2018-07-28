import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket/socket.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  usersList: Array<string>;
  usersCount: number;

  constructor(private socketService: SocketService) {

    this.socketService.getUsers().subscribe(data => {

      this.usersList = data.usersArray;
      this.usersCount = data.usersCount;

    })

  }

  ngOnInit() {
  }

}
