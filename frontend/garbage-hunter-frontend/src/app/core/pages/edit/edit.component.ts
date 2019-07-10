import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { FlashService } from 'src/app/services/flash/flash.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  /**
   * @description flash message
   */
  flash: any = this.flashService.getFlashes();

  /**
   * @description current user that accessing the page.
   */
  currentUser: User = null;

  /**
   * @description the main message.
   */
  message: Message = null;

  /**
   * @description if true, show error component
   */
  showError = false;

  constructor(
    public messageService: MessageService,
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router,
    public flashService: FlashService,
    public _location: Location
  ) {}

  ngOnInit() {
    this.flash = this.flashService.getFlashes();
    this.route.params.subscribe(async (params) => {
      let messageid = params['messageid'];
      this.getMessage(messageid);
    });
  }

  /**
   * @description get the message item.
   */
  getMessage = (messageid: string): void => {
    this.messageService.getMessageById(messageid).subscribe(
      (message) => {
        this.message = message;
      },
      (error) => {
        this.showError = true;
      }
    );
  }

  editMessage() {
    if (this.validateForms()) {
      this.messageService.updateMessage(this.message).subscribe(
        (updatedMessage) => {
          this.flashService.setFlashSuccess(`Message is successfully edited!`);
          this.router.navigate([`/messages/${this.message._id}`]);
        },
        (error) => {
          this.flashService.setErrorFlash('message can not be updated! something is wrong!');
          this.router.navigate([`/messages/${this.message._id}/`]);
        }
      );
    } else {
      this.flashService.setErrorFlash('message can not be updated! something is wrong!');
      this.router.navigate([`/messages/${this.message._id}`]);
    }
  }

  /**
   * @description validate the message's form.
   * currently only handled phone because only that is a number in edit page
   */
  validateForms = (): boolean => {
    if (this.message.phone && !Number.isInteger(this.message.phone)) {
      return false;
    }
    return true;
  }

  /**
   * @description check if user is the creator of message.
   */
  canEdit = (): boolean => {
    if (
      this.userService.user &&
      this.message &&
      (this.userService.user.isAdmin || this.userService.user._id == this.message.creatorId)
    ) {
      return true;
    }
    return false;
  }

  clickBack = (): void => {
    this._location.back();
  }
}
