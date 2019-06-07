import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
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
    // this.message.lat = latlon.lat;
    // this.message.lon = latlon.lng;
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
        // this.message.address = `${road} ${house_number}, ${postcode} ${city}`;
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
