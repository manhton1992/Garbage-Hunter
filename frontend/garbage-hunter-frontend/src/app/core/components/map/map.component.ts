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
   */
  @Input() messages: Message[] = [];

  /**
   * @description which page is accessing this map.
   */
  @Input() pageType: string;

  /**
   * @description pass the latitude & longitude to the parent component (create page).
   * CREATE-MESSAGE
   */
  @Output() createPageLatLon: EventEmitter<number> = new EventEmitter();

  /**
   * @description the map component of the page
   */
  myMap: Map = null;

  /**
   * ==========================================
   * CONFIG VARIABLES FOR THE MAP
   * ==========================================
   */

  /**
   * @description config layout for the map.
   */
  MAP_CONF_STREET_MAP = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  /**
   * @description config layout for marker.
   */
  MAP_CONF_MARKER = {
    icon: icon({
      iconSize: [51, 51],
      iconAnchor: [25, 51],
      popupAnchor: [0, -51],
      iconUrl: 'assets/location-pin.png',
    }),
  };

  /**
   * @description config layout for user marker.
   */
  MAP_CONF_USER = {
    icon: icon({
      iconSize: [40, 40],
      popupAnchor: [0, -20],
      iconUrl: 'assets/position-target.png',
    }),
  };

  /**
   * @description general config for the map.
   */
  MAP_CONF = {
    layers: [this.MAP_CONF_STREET_MAP],
    zoom: 13,
    center: latLng(49.87283243897958, 8.651180863380432),
  };

  /**
   * ==========================================
   * ANGULAR FUNCTIONS
   * ==========================================
   */

  constructor(private mapService: MapService) {}

  ngOnInit() {}

  /**
   * ==========================================
   * FUNCTIONS
   * ==========================================
   */

  /**
   * @description executes after the map is ready.
   */
  onMapReady = (map: Map): void => {
    this.myMap = map;
    setTimeout(() => {
      this.setMarker(map);
      this.centerMap();
    }, 1000);
  }

  /**
   * @description map click event.
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
  }

  /**
   * @description create popup for the home page.
   * getting the address of the selected coordinate and
   * create a link to report new message with params
   * HOME
   */
  homePagePopup = (e: any): void => {
    this.mapService.getAddressFromLatLon(e.latlng.lat, e.latlng.lng).subscribe(
      (data) => {
        const address = this.processAddress(data);
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
   * @description create marker and send latitude & longitude to the create page.
   * CREATE-MESSAGE
   */
  createPageMarker = (e: any): void => {
    // TODO do not remove location marker
    this.myMap.eachLayer((layer: any) => {
      if (!layer._url) {
        layer.removeFrom(this.myMap);
      }
    });

    marker([e.latlng.lat, e.latlng.lng], this.MAP_CONF_MARKER).addTo(this.myMap);

    this.createPageLatLon.emit(e.latlng);
  }

  /**
   * @description set markers for the messages in the map
   */
  setMarker = (map: Map): void => {
    if (this.messages.length > 0) {
      this.messages.forEach((message) => {
        if (message && message.lat && message.lon) {
          marker([message.lat, message.lon], this.MAP_CONF_MARKER)
            .addTo(map)
            .bindPopup(`<a href="messages/${message._id}">${message.title}</a>`);
        }
      });
    }
  }

  /**
   * @description center the position of the map.
   */
  centerMap = (): void => {
    switch (this.pageType) {
      case 'show':
        this.centerToMessage();
        break;
      case 'create':
        this.getUserLocation();
        setTimeout(() => {
          this.centerToMessage();
        }, 1000);
        break;
      default:
        this.getUserLocation();
        break;
    }
  }

  /**
   * @description get the current position.
   * HOME, CREATE-MESSAGE
   */
  getUserLocation = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLon = new LatLng(position.coords.latitude, position.coords.longitude);
        this.myMap.setView(latLon, 14);
        this.mapService.getAddressFromLatLon(latLon.lat, latLon.lng).subscribe((data) => {
          marker(latLon, this.MAP_CONF_USER)
            .addTo(this.myMap)
            .bindPopup(`Your current location:<br><strong>${this.processAddress(data)}</strong>`);
        });
      },
      () => {
        alert('error, no location is allowed');
      }
    );
  }

  /**
   * @description center by the message.
   * SHOW-MESSAGE, CREATE-MESSAGE
   */
  centerToMessage = (): void => {
    if (this.messages.length > 0 && this.messages[0] && this.messages[0].lat && this.messages[0].lon) {
      this.myMap.setView(new LatLng(this.messages[0].lat, this.messages[0].lon), 17);
    }
  }

  /**
   * @description return the address from reverse geocoding
   */
  processAddress = (data: any): string => {
    const road = data.road ? data.road : '';
    const houseNumber = data.house_number ? data.house_number : '';
    const postcode = data.postcode ? data.postcode : '';
    const city = data.city ? data.city : '';
    return `${road} ${houseNumber}, ${postcode} ${city}`;
  }
}
