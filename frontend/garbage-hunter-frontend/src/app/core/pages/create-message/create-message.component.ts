import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import { Message } from '../../../models/message.model';
import { MessageService } from '../../../services/message/message.service';
import { UserService } from 'src/app/services/user/user.service';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { MessageCategoryService } from 'src/app/services/message/message-category/message-category.service';
import { UserCategoryService } from 'src/app/services/user/user-category/user-category.service';
import { MessageCategory } from 'src/app/models/message-category.model';
import { EmailService } from 'src/app/services/email/email.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashService } from 'src/app/services/flash/flash.service';

/**
 * @description class for the uploaded image
 */
class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent implements OnInit {

  /**
   * @description flash message
   */
  flash: any = this.flashService.getFlashes();

  /**
   * @description selected image of the input file
   */
  selectedFile: ImageSnippet;

  /**
   * @description selected categories of the message.
   */
  selectedCategories: Category[];

  /**
   * @description message that will be created.
   */
  newMessage: Message = {
    title: '',
    description: '',
    creatorId: null,
    lon: null,
    lat: null,
    address: '',
    available: true,
    archive: false,
    imageUrl: '',
    phone: null,
  };

  listUserIdToSendSubscribeEmail: string[] = [];

  constructor(
    public userService: UserService,
    public messageService: MessageService,
    public mapService: MapService,
    public categoryService: CategoryService,
    public messageCategoryService: MessageCategoryService,
    public userCategoryService: UserCategoryService,
    public emailService: EmailService,
    public route: ActivatedRoute,
    public router: Router,
    public flashService: FlashService
  ) {}

  ngOnInit() {
    this.processQueryParams();
    this.setCreator();
    if (this.categoryService.categories.length == 0) {
      this.categoryService.getAllCategories().subscribe((response) => {
        this.categoryService.categories = response;
      });
    }
    this.addDeleteUploadedImageListener();
  }

  processQueryParams = (): void => {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams) {
        this.newMessage.address = queryParams['address'];
        this.newMessage.lat = queryParams['lat'];
        this.newMessage.lon = queryParams['lon'];
      }
    });
  }

  /**
   * 1.add new message
   * 2.create new message category
   * 3.find match user category
   * 4.avoid duplicate email
   * 5.send email to subscribe user
   */
  addNewMessage() {
    const newMessage = Object.assign({}, this.newMessage);
    this.listUserIdToSendSubscribeEmail = [];
    if (this.userService.user) {
      // create new message
      this.messageService.createMessage(newMessage).subscribe(
        (responseMessage) => {
          if (this.selectedCategories && this.selectedCategories.length > 0) {
            this.selectedCategories.forEach((category) => {
              const messageCategory: MessageCategory = {
                messageId: responseMessage._id,
                categoryId: category._id,
              };
              // create new message category
              this.messageCategoryService
                .createMessageCategory(messageCategory)
                .subscribe();

              // find user categories , which has the same categoryId
              this.userCategoryService
                .getAllUserCategories({ categoryId: category._id })
                .subscribe((responseUserCategory) => {
                  // avoid duplicate userId
                  if (responseUserCategory != null && responseUserCategory.length > 0) {
                    responseUserCategory.forEach((userCategory) => {
                      if (!this.listUserIdToSendSubscribeEmail.includes(userCategory.userId)) {
                        this.listUserIdToSendSubscribeEmail.push(userCategory.userId);
                      }
                    });
                  }
                });
            });
            setTimeout(() => {
              // send email to each user in the listUserId
              this.listUserIdToSendSubscribeEmail.forEach((userId) => {
                if (this.userService.user._id !== userId) {
                  this.emailService.sendEmailSubscribe(userId, responseMessage._id).subscribe();
                }
              });
            }, 2000);
          }
          this.flashService.setFlashSuccess('message successfully created!');
          localStorage.removeItem('imgUrl');
          this.router.navigate([`/messages/${responseMessage._id}`]);
        },
        (error) => {
          this.flashService.setErrorFlash('Something went wrong, please try again!');
          this.flash = this.flashService.getFlashes();
        }
      );
    } else {
      this.flashService.setErrorFlash('please login to create a message');
      this.flash = this.flashService.getFlashes();
    }
  }

  /**
   * @description set the creator id as the logged in user
   * make delay 1 s to make sure user is in user service
   */
  setCreator = (): void => {
    setTimeout(() => {
      this.newMessage.creatorId = this.userService && this.userService.user ? this.userService.user._id : null;
    }, 1000);
  }

  /**
   * @description handle the latLon being passed from map component
   */
  handleMapCoordinateChange = (latLon: any): void => {
    this.changeLatLon(latLon);
    this.changeAddress(latLon);
  }

  /**
   * @description change the latLon of message.
   */
  changeLatLon = (latLon: any): void => {
    this.newMessage.lat = latLon.lat;
    this.newMessage.lon = latLon.lng;
  }

  /**
   * @description change the address of message.
   */
  changeAddress = (latLon: any): void => {
    this.mapService.getAddressFromLatLon(latLon.lat, latLon.lng).subscribe(
      (data) => {
        const road = data.road ? data.road : '';
        const houseNumber = data.house_number ? data.house_number : '';
        const postcode = data.postcode ? data.postcode : '';
        const city = data.city ? data.city : '';
        this.newMessage.address = `${road} ${houseNumber}, ${postcode} ${city}`;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * @description handle when an image is chosen (upload image to storage server).
   */
  onFileChange = (e: any): void => {
    const file: File = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;

      this.messageService.uploadImage(this.selectedFile.file).subscribe(
        (imageUrl) => {
          this.selectedFile.pending = false;
          this.selectedFile.status = 'ok';
          this.newMessage.imageUrl = imageUrl;
          localStorage.setItem('imgUrl', imageUrl);
        },
        (error) => {
          this.selectedFile.pending = false;
          this.selectedFile.status = 'fail';
          this.selectedFile.src = '';
        }
      );
    });

    reader.readAsDataURL(file);
  }

  /**
   * @description delete uploaded image that has not yet submitted on refresh.
   */
  addDeleteUploadedImageListener = () => {
    window.onbeforeunload = () => {
      const imgUrl = localStorage.getItem('imgUrl');
      if (imgUrl) {
        const imageKey = imgUrl.split('/').pop();
        this.messageService.deleteUploadedImage(imageKey).subscribe((result) => {
          localStorage.removeItem('imgUrl');
        });
      }
    };
  }
}
