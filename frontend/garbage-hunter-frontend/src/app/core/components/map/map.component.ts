import { Component, OnInit, Input } from '@angular/core';
import { tileLayer, marker, icon, Map, LatLng, popup, latLng } from 'leaflet';
import { Message } from 'src/app/models/message.model';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  /**
   * @description messages being passed from parent component.
   * @type {Message[]}
   * @memberof MapComponent
   */
  @Input() messages: Message[] = [];

  /**
   * @description the map component of the page
   * @type {Map}
   * @memberof MapComponent
   */
  myMap: Map = null;

  /**
   * ==========================================
   * CONFIG VARIABLES FOR THE MAP
   * ==========================================
   */

  /**
   * @description config layout for the map.
   * @memberof MapComponent
   */
  map_conf_streetmap = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  /**
   * @description config layout for marker.
   * @memberof MapComponent
   */
  map_conf_marker = {
    icon: icon({
      iconSize: [51, 51],
      iconAnchor: [25, 51],
      popupAnchor: [0, -51],
      iconUrl: 'assets/location-pin.png',
    }),
  };

  /**
   * @description config layout for user marker.
   * @memberof MapComponent
   */
  map_conf_user = {
    icon: icon({
      iconSize: [40, 40],
      popupAnchor: [0, -20],
      iconUrl: 'assets/position-target.png',
    }),
  };

  /**
   * @description general config for the map.
   * @memberof MapComponent
   */
  map_conf = {
    layers: [this.map_conf_streetmap],
    zoom: 13,
    center: latLng(50.869009, 8.637904),
  };

  /**
   * ==========================================
   * FUNCTIONS
   * ==========================================
   */

  /**
   * @description executes after the map is ready.
   * @param {Map} map
   * @memberof MapComponent
   */
  onMapReady = (map: Map): void => {
    this.myMap = map;
    setTimeout(() => {
      this.setMarker(map);
      this.getUserLocation();
    }, 1000);
  };

  /**
   * @description map click event.
   * getting the address of the selected coordinate and 
   * create a link to report new message with params
   * @memberof MapComponent
   */
  onMapClick = (e): void => {
    this.mapService.getAddressfromLatLon(e.latlng.lat, e.latlng.lng).subscribe(
      (data) => {
        let road = data.road ? data.road : '';
        let house_number = data.house_number ? data.house_number : '';
        let postcode = data.postcode ? data.postcode : '';
        let city = data.city ? data.city : '';
        let address = `${road} ${house_number}, ${postcode} ${city}`;
        popup()
          .setLatLng(e.latlng)
          .setContent(
            `<em>${address}</em><br><a href="message/create?lat=${e.latlng.lat}&lon=${
              e.latlng.lng
            }&address=${address}">Create new message</a>`
          )
          .openOn(this.myMap);
      },
      (err) => {
        console.error(err);
        popup()
          .setLatLng(e.latlng)
          .setContent(`<a href="message/create?lat=${e.latlng.lat}&lon=${e.latlng.lng}">Create new message</a>`)
          .openOn(this.myMap);
      }
    );
  };

  /**
   * @description set markers for the messages in the map
   * @memberof MapComponent
   */
  setMarker = (map: Map): void => {
    this.messages.forEach((message) => {
      marker([message.lat, message.lon], this.map_conf_marker)
        .addTo(map)
        .bindPopup(`<a href="message/${message._id}">${message.title}</a>`);
    });
  };

  /**
   * @description get the current position.
   * @memberof MapComponent
   */
  getUserLocation = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latlon = new LatLng(position.coords.latitude, position.coords.longitude);
        this.myMap.setView(latlon, 14);
        marker(latlon, this.map_conf_user)
          .addTo(this.myMap)
          .bindPopup(`Your current location:<br><strong>(${latlon.lat},${latlon.lng})</strong>`);
      },
      () => {
        alert('error, no location is allowed');
      }
    );
  };

  /**
   * ==========================================
   * ANGULAR FUNCTIONS
   * ==========================================
   */

  constructor(private mapService: MapService) {}

  ngOnInit() {
  }
}
