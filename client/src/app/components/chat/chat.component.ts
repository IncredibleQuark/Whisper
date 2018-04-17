import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat/chat.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // private message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService, private authService: AuthService) {

    this.authService.getProfile().subscribe( profile => {

      this.chatService.logUser(profile['user']['username']);
    });

  }

  ngOnInit() {

    this.chatService.getMessages().subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  send(messageForm) {
    this.chatService.sendMessage(messageForm.value.message);
    messageForm.controls.message.value = '';
    messageForm.value.message = '';
  }

}
