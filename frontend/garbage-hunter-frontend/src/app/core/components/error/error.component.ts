import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  /**
   * @description code for the error
   */
  @Input() code: number;

  /**
   * @description text for the error
   */
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
