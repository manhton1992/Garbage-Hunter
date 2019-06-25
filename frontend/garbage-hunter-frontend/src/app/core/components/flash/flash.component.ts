import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit {

  @Input() text: any;

  constructor() { }

  ngOnInit() {
  }

}
