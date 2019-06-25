import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateMessageComponent } from 'src/app/core/pages/create-message/create-message.component';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class LeaveCreateMessageService implements CanDeactivate<CreateMessageComponent> {
  constructor(private messageService: MessageService) {}

  canDeactivate(target: CreateMessageComponent) {
    const imgUrl = localStorage.getItem('imgUrl');
    if (imgUrl) {
      const imageKey = imgUrl.split('/').pop();
      this.messageService.deleteUploadedImage(imageKey).subscribe((result) => {
        localStorage.removeItem('imgUrl');
      });
    }
    return true;
  }
}
