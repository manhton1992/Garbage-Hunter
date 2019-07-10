import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit {

  /**
   * @description text object, contains either success/error text
   */
  @Input() text: any;

  constructor() { }

  ngOnInit() {
  }

}
