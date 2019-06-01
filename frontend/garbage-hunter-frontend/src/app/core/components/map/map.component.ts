import { Component, OnInit, Input } from '@angular/core';
import { latLng, tileLayer, marker, icon, Map } from 'leaflet';
import { Message } from 'src/app/models/message.model';

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
  @Input() messages: Message[];

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
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    }),
  };

  /**
   * @description general config for the map.
   * @memberof MapComponent
   */
  map_conf = {
    layers: [this.map_conf_streetmap],
    zoom: 17,
    center: latLng(49.869009, 8.637904),
  };

  /**
   * @description executes after the map is ready.
   * @param {Map} map
   * @memberof MapComponent
   */
  onMapReady = (map: Map): void => {
    this.messages.forEach((message) => {
      marker([message.lat, message.lon], this.map_conf_marker)
        .addTo(map)
        .bindPopup(message._id);
    });
  }

  constructor() {}

  ngOnInit() {}
}
