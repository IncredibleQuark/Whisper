import { Component } from '@angular/core';
import {ChatConnectionService} from '../../services/ChatConnectionService/chatConnection.service';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private message: string;
  messages: any = [];

  constructor(private chatConnectionService: ChatConnectionService) {
  }

  ngOnInit() {
    console.warn('geeee');
    this.chatConnectionService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    this.chatConnectionService.sendMessage(this.message);
    this.message = '';
  }
}
