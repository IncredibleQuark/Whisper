import { Component } from '@angular/core';
import {ChatConnectionService} from '../../services/ChatConnectionService/chatConnection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private message: string;

  constructor(private chatConnectionService: ChatConnectionService) {

  }

  sendMessage() {
    this.chatConnectionService.sendMessage(this.message);
    this.message = '';
  }
}
