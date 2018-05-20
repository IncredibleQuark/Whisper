import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../services/chat/chat.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

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

    if (messageForm.value.message !== "") {
      const data = {date: new Date(), message: messageForm.value.message};
      this.chatService.sendMessage(data);
    }

  }

}
