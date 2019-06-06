import { Component, OnInit } from '@angular/core';
import {Message} from "../../../models/message.model";
import {MessageService} from "../../../services/message/message.service";

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {
  newMessage: Message = {
    title: '',
    description: '',
    creatorid: 123456,
    lon: 8.637871742248533,
    lat: 49.86844666280919,
    address: ``,
    available: true,
    archive: false,
    image: 'https://cdn1.stuttgarter-zeitung.de/media.media.ec722513-be5c-474a-88d9-db2b05e31ccb.original1024.jpg',
    phone: 0,
  }
  constructor(private messageService : MessageService) { }

  ngOnInit() {

  }
  addNewMessage(){
    let tmpNewMessage = Object.assign({},this.newMessage);
    this.messageService.createMessage(tmpNewMessage).subscribe();
  }

}
