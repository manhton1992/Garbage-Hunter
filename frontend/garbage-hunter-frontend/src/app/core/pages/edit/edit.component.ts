import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Message } from 'src/app/models/message.model';
import { Comment } from 'src/app/models/comment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { MapService } from 'src/app/services/map/map.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { MessageCategoryService } from 'src/app/services/message/message-category/message-category.service';
import { UserCategoryService } from 'src/app/services/user/user-category/user-category.service';
import { MessageCategory } from 'src/app/models/message-category.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
/**
   * @description current user that accessing the page.
   * @type {User}
   * @memberof ShowMessageComponent
   */
  currentUser: User = null;

  /**
   * @description the main message.
   * @type {Message}
   * @memberof ShowMessageComponent
   */
  message: Message = null;

  /**
   * @description all categories of the main message.
   * @type {MessageCategory[]}
   * @memberof ShowMessageComponent
   */
  messageCategories: MessageCategory[] = [];

/**
   * @description all categories in the main message.
   * @type {Category[]}
   * @memberof ShowMessageComponent
   */
  category: Category[] = [];

  /**
   * @description creator of the main message
   * @type {User}
   * @memberof ShowMessageComponent
   */
  creator: User = null;

  /**
   * @description all comments of the main message.
   * @type {Comment[]}
   * @memberof ShowMessageComponent
   */
  comments: Comment[] = [];

  showError: boolean = false;

  constructor(
    private messageService: MessageService,
    private commentService: CommentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private mapService: MapService,
    private categoryService: CategoryService,
    private messageCategoryService: MessageCategoryService,
    private userCategoryService: UserCategoryService,
  ) { }

  ngOnInit() {
    if (this.categoryService.categories.length == 0){      
      this.categoryService.getAllCategories().subscribe(response => {
          this.categoryService.categories = response;
      })
    }
    this.route.params.subscribe( async (params) =>  {
      let messageid = params['messageid'];
      this.getMessage(messageid);
    });
  }

  /**
   * @description get the message item.
   * @param {string} messageid
   */
  getMessage = (messageid: string):void => {
    this.messageService.getMessageById(messageid).subscribe(message => {
      this.message = message;
      if(this.message ) {
        this.getCreator();
        this.getComments();
        this.getMessageCategories();
      }
    }
    , error => {
      this.showError = true;
    })
  }

  /**
   * @description get the creator of the message
   * @memberof ShowMessageComponent
   */
  getCreator = (): void => {
    if (this.message) {
      this.userService.getUserById(this.message.creatorId).subscribe(user => {
        this.creator = user; 
      })
    }
  }
  /**
   * @description get all comments of the message.
   * @param {string} messageid
   */
  getComments = ():void => {
    if (this.message) { 
      this.commentService.getAllComments({ messageId: this.message._id }).subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  /**
   * @description get all available messages.
   * @memberof HomeComponent
   */
  getMessageCategories = (): void => {
    this.messageCategoryService.getAllMessageCategories({messageId: this.message._id}).subscribe((messages) => {
      this.messageCategories = messages;
      if(this.messageCategories){
        this.getCategoryNames();
      }
    });
 };

 getCategoryNames = (): void => {
   for (let i = 0; i < this.messageCategories.length; i++){
     this.categoryService.getCategoryById(this.messageCategories[i].categoryId).subscribe((messages) =>{
       this.category.push(messages);
      })
    }
 }

  /**
   * @description delete the message.
   * @memberof ShowMessageComponent
   */
  archiveMessage = (): void => {
    if (this.currentUser && this.currentUser.isAdmin) { 
      this.message.archive = true;
      this.messageService.updateMessage(this.message).subscribe(success => {
        this.router.navigate(['/']);
      });
    }
  }

  /**
   * @description show action div that contains buttons to do something to the message
   * @memberof ShowMessageComponent
   */
  showActionDiv = (): boolean => {
    if (!this.currentUser) {
      // return false;
    }
    return true;
  }

  /**
   * @description show/hide edit and mark as unavailable buttons specific to current user.
   * @memberof ShowMessageComponent
   */
  showEditChangeButton = (): boolean => {
    if (this.currentUser && (this.currentUser._id == this.creator._id || this.currentUser.isAdmin)) {
      return true;
    }
    return false;
  }

  /**
   * @description show/hide delete button only to admins.
   * @returns {boolean}
   */
  showDeleteButton = (): boolean => {
    if (this.currentUser && this.currentUser.isAdmin) {
      return true;
    }
    return false;
  }

  editMessage(message: Message){
    let url = '/messages/' + this.message._id;
    this.messageService.updateMessage(this.message).subscribe();
    alert("Message successfully edited");
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });;
  }


  /**
   * @description handle the latlon being passed from map component
   * @memberof CreateMessageComponent
   */
  handleMapCoordinateChange = (latlon: any): void => {
    this.changeLatLon(latlon);
    this.changeAddress(latlon);
  }

  /**
   * @description change the latlon of message.
   * @memberof CreateMessageComponent
   */
  changeLatLon = (latlon: any): void => {
    this.message.lat = latlon.lat;
    this.message.lon = latlon.lng;
  }

  /**
   * @description change the address of message.
   * @memberof CreateMessageComponent
   */
  changeAddress = (latlon: any): void => {
    this.mapService.getAddressfromLatLon(latlon.lat, latlon.lng).subscribe(
      (data) => {
        let road = data.road ? data.road : '';
        let house_number = data.house_number ? data.house_number : '';
        let postcode = data.postcode ? data.postcode : '';
        let city = data.city ? data.city : '';
        this.message.address = `${road} ${house_number}, ${postcode} ${city}`;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}

