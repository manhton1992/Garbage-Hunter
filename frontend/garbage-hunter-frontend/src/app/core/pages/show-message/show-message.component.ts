import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../../services/message/message.service";
import {Message} from "../../../models/message.model";
import {Location} from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent implements OnInit {
  @Input() message : Message;
  constructor(
    private messageService : MessageService,
    private location : Location,
    private route : ActivatedRoute
  ) { }
  ngOnInit() {
    this.getMessage();
  }
  getMessage() : void {
    let messageId;
    this.route.paramMap.subscribe(params => {
      messageId = params.get("id");
      this.messageService.getMessageById(params.get("id")).subscribe(message => this.message = message);
    })
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
