import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChatService} from '../../services/chat/chat.service';
import {AuthService} from '../../services/auth/auth.service';
import {MatListItem} from "@angular/material";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  messages: string[] = [];
  @ViewChildren(MatListItem, {read: ElementRef}) matListItems: QueryList<MatListItem>;
  @ViewChild('messagesBox', {read: ElementRef}) messagesBox: ElementRef;

  constructor(private chatService: ChatService, private authService: AuthService) {

    this.authService.getProfile().subscribe((user:any) => {
      this.chatService.logUser(user.user);
    });

    this.chatService.getMessages().subscribe((message) => {
        this.messages.push(message);
      }, err => console.warn(err)
    )

  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of messages
    this.matListItems.changes.subscribe(() => {
      this.scrollToBottom();
    });
  }

  send(messageForm) {

    if (messageForm.value.message !== "" && messageForm.value.message !== null) {
      const data = {date: new Date(), message: messageForm.value.message};
      this.chatService.sendMessage(data);
      messageForm.reset();
    }

  }

  scrollToBottom() {
    try {
         this.messagesBox.nativeElement.scrollTop = this.messagesBox.nativeElement.scrollHeight;
    } catch {}
  }

}
