import { Component, OnInit, Input } from '@angular/core';
import { latLng, tileLayer, marker, icon, Map } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() messages;

  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

 testmarker = marker([ 49.869009, 8.637904 ], {
  icon: icon({
    iconSize: [ 25, 41 ],
    iconAnchor: [ 13, 41 ],
    iconUrl: 'leaflet/marker-icon.png',
    shadowUrl: 'leaflet/marker-shadow.png'
  })
});

  options = {
    layers: [this.streetMaps, this.testmarker],
    zoom: 17,
    center: latLng(49.869009, 8.637904)
  };

  onMapReady(map: Map) {
    this.testmarker.bindPopup('I am a meldung');
  }


  constructor() { }

  ngOnInit() {
  }

}
