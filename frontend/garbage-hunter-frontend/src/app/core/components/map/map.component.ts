import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
   * HOME, SHOW-MESSAGE
   * @type {Message[]}
   * @memberof MapComponent
   */
  @Input() messages: Message[] = [];

  /**
   * @description which page is accessing this map.
   * @type {string}
   * @memberof MapComponent
   */
  @Input() pageType: string;

  /**
   * @description pass the latlon to the parent component (create page).
   * CREATE-MESSAGE
   * @type {EventEmitter<number>}
   * @memberof MapComponent
   */
  @Output() createPageLatLon: EventEmitter<number> = new EventEmitter();

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
      this.centerMap();
    }, 1000);
  };

  /**
   * @description map click event.
   * @memberof MapComponent
   */
  onMapClick = (e: any): void => {
    switch (this.pageType) {
      case 'home':
        this.homePagePopup(e);
        break;
      case 'create':
        this.createPageMarker(e);
        break;
      default:
        break;
    }
  };

  /**
   * @description create popup for the home page.
   * getting the address of the selected coordinate and 
   * create a link to report new message with params
   * HOME
   * @memberof MapComponent
   */
  homePagePopup = (e: any): void => {
    this.mapService.getAddressfromLatLon(e.latlng.lat, e.latlng.lng).subscribe(
      (data) => {
        let address = this.processAddress(data);
        popup()
          .setLatLng(e.latlng)
          .setContent(
            `<em>${address}</em><br><a href="messages/create?lat=${e.latlng.lat}&lon=${
              e.latlng.lng
            }&address=${address}">Create new message</a>`
          )
          .openOn(this.myMap);
      },
      (err) => {
        console.error(err);
        popup()
          .setLatLng(e.latlng)
          .setContent(`<a href="messages/create?lat=${e.latlng.lat}&lon=${e.latlng.lng}">Create new message</a>`)
          .openOn(this.myMap);
      }
    );
  }

  /**
   * @description create marker and send latlon in the create page. 
   * CREATE-MESSAGE
   * @memberof MapComponent
   */
  createPageMarker = (e: any): void => {
    // TODO do not remove location marker
    this.myMap.eachLayer((layer:any) => {
      if (!layer._url) {
        layer.removeFrom(this.myMap);
      }
    })
    
    marker([e.latlng.lat, e.latlng.lng], this.map_conf_marker)
        .addTo(this.myMap);

    this.createPageLatLon.emit(e.latlng);
  }
  

  /**
   * @description set markers for the messages in the map
   * @memberof MapComponent
   */
  setMarker = (map: Map): void => {
    if (this.messages.length > 0) { 
      this.messages.forEach((message) => {
        if (message) {    
          marker([message.lat, message.lon], this.map_conf_marker)
          .addTo(map)
          .bindPopup(`<a href="messages/${message._id}">${message.title}</a>`);
        }
      });
    }
  };

  /**
   * @description center the position of the map.
   * @memberof MapComponent
   */
  centerMap = (): void => {
    if (this.pageType == 'show') {
      this.centerToMessage();
    } else {
      this.getUserLocation();
    }
  }

  /**
   * @description get the current position.
   * HOME, CREATE-MESSAGE
   * @memberof MapComponent
   */
  getUserLocation = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latlon = new LatLng(position.coords.latitude, position.coords.longitude);
        this.myMap.setView(latlon, 14);
        this.mapService.getAddressfromLatLon(latlon.lat, latlon.lng).subscribe(data => {
          marker(latlon, this.map_conf_user)
          .addTo(this.myMap)
          .bindPopup(`Your current location:<br><strong>${this.processAddress(data)}</strong>`);
        });
      },
      () => {
        alert('error, no location is allowed');
      }
    );
  };

  /**
   * @description center by the message.
   * SHOW-MESSAGE
   * @memberof MapComponent
   */
  centerToMessage = (): void => {
    if (this.messages.length > 0 && this.messages[0]) { 
      this.myMap.setView(new LatLng(this.messages[0].lat, this.messages[0].lon), 17);
    }
  }

  processAddress = (data: any): string => {
    let road = data.road ? data.road : '';
    let house_number = data.house_number ? data.house_number : '';
    let postcode = data.postcode ? data.postcode : '';
    let city = data.city ? data.city : '';
    return `${road} ${house_number}, ${postcode} ${city}`;
  }

  /**
   * ==========================================
   * ANGULAR FUNCTIONS
   * ==========================================
   */

  constructor(private mapService: MapService) {}

  ngOnInit() {
  }
}
