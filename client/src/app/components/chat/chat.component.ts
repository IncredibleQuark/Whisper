import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SocketService} from '../../services/socket/socket.service';
import {AuthService} from '../../services/auth/auth.service';
import {MatListItem} from "@angular/material";
import {IApiResponse} from "../../interfaces/apiResponse.interface";
import {IUser} from "../../interfaces/user.interface";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  messages: string[] = [];
  @ViewChildren(MatListItem, {read: ElementRef}) matListItems: QueryList<MatListItem>;
  @ViewChild('messagesBox', {read: ElementRef}) messagesBox: ElementRef;

  constructor(private socketService: SocketService, private authService: AuthService) {

    this.authService.getProfile().subscribe((response:IApiResponse<IUser>) => {
      this.socketService.logUser(response.data);
    });

    this.socketService.getMessages().subscribe((message) => {
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
      this.socketService.sendMessage(data);
      messageForm.reset();
    }

  }

  scrollToBottom() {
    try {
         this.messagesBox.nativeElement.scrollTop = this.messagesBox.nativeElement.scrollHeight;
    } catch {}
  }

}
