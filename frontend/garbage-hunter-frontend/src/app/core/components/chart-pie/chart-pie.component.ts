import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../../../assets/ext-library/canvasjs/canvasjs.min.js';


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
    setTimeout(() => {
      
      var chart = new CanvasJS.Chart("chartPieContainer", {
        animationEnabled: true,
        theme: "light2",
        exportFileName: "data_monthly",
        exportEnabled: true,
        data: [{
          type: "pie",
          indexLabel: "{label} {y}",
          dataPoints: this.data
        }]
      });
      chart.render();
    }, 1000);
  }

}
