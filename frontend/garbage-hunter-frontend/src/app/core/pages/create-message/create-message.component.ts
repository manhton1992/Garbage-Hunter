import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import {Message} from "../../../models/message.model";
import {MessageService} from "../../../services/message/message.service";
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  newMessage: Message = {
    title: '',
    description: '',
    creatorid: 12345,
    lon: null,
    lat: null,
    address: '',
    available: true,
    archive: false,
    image: 'https://cdn1.stuttgarter-zeitung.de/media.media.ec722513-be5c-474a-88d9-db2b05e31ccb.original1024.jpg',
    phone: null,
  }
  constructor(private userService: UserService, private messageService : MessageService, private mapService: MapService) { }

  ngOnInit() {
    this.setCreator();
  }

  addNewMessage(){
    let newMessage = Object.assign({},this.newMessage);
    this.messageService.createMessage(newMessage).subscribe();
  }

  /**
   * @description set the creatorid as the logged in user
   * @memberof CreateMessageComponent
   */
  setCreator = (): void => {
    // this.newMessage.creatorid = this.userService.user ? this.userService.user._id : null;
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
    this.newMessage.lat = latlon.lat;
    this.newMessage.lon = latlon.lng;
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
        this.newMessage.address = `${road} ${house_number}, ${postcode} ${city}`;
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
