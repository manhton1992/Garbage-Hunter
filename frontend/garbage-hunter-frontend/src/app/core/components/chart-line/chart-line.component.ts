import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {

  /**
   * @description label for the x-axis
   * @type {string}
   * @memberof ChartLineComponent
   */
  @Input() xAxisLabel: string;

  /**
   * @description label for the y-axis
   * @type {string}
   * @memberof ChartLineComponent
   */
  @Input() yAxisLabel: string;

  /**
   * @description statistics of the chart
   * @type {any[]}
   * @memberof ChartLineComponent
   */
  @Input() data: any[];

  constructor() { }

  ngOnInit() {
  }

}
