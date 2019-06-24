import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../../../assets/ext-library/canvasjs/canvasjs.min.js';

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
    setTimeout(() => {
      console.log(this.data);
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        exportFileName: "data_monthly",
        exportEnabled: true,
        data: [{        
          type: "line",       
          dataPoints: this.data
        }]
      });
      chart.render();
    }, 1000);
  }

}
