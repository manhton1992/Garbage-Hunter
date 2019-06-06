import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../../services/message/message.service";
import {Message} from "../../../models/message.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent implements OnInit {
  @Input() message : Message;
  constructor(
    private messageService : MessageService,
    private location : Location
  ) { }
  ngOnInit() {
    this.getMessage();
  }
  getMessage() : void {
    let stringToSplit = window.location.href;
    let x = stringToSplit.split("/");
    this.messageService.getMessageById(x[x.length-1]).subscribe(message => this.message = message);
  }
  goBack() : void {
    this.location.back();
  }
  upDate() : void {
    this.messageService.updateMessage(this.message).subscribe(() => this.goBack());
  }
  deleteMessage() : void {
    this.messageService.deleteMessage(this.message._id.toString()).pipe().subscribe(() =>this.goBack());
  }
}
