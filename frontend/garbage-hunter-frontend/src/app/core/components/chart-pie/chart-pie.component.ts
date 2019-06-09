import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {

  /**
   * @description statistics of the chart
   * @type {any[]}
   * @memberof ChartLineComponent
   */
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
