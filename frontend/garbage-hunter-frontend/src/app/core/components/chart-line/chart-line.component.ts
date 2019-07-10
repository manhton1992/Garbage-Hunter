import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../../../assets/ext-library/canvasjs/canvasjs.min.js';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
})
export class ChartLineComponent implements OnInit {

  /**
   * @description statistics of the chart
   */
  @Input() data: any[];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.initChart();
    }, 1000);
  }

  /**
   * @description initialize chart
   */
  initChart = (): void => {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'light2',
      exportFileName: 'data_monthly',
      exportEnabled: true,
      data: [
        {
          type: 'line',
          dataPoints: this.data,
        },
      ],
    });
    chart.render();
  }
}
