import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  /**
   * @description messages that will be shown.
   * @type {Message[]}
   * @memberof HomeComponent
   */
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.getMessages();
  }

  /**
   * @description get all messages.
   * @memberof HomeComponent
   */
  getMessages = (): void => {
    // REAL FUNCTION FIRST COMMENTED
    // this.messageService.getAllMessages().subscribe((messages) => {
    //   this.messages = messages;
    // });
    this.messages = this.messageService.testGetAllMessages();
  };
}
