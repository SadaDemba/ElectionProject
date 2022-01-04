import { Component,ViewChild, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart} from "ng-apexcharts";

export type ChartOptions = {
  series: any;//ApexNonAxisChartSeries;
  chart: any;//ApexChart;
  responsive:any; //ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
  constructor() 
  {


    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 500,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 1000,
              
            },
            legend: {
              position: "center",
            }
          }
        }
      ]
    };



  }

  ngOnInit(): void {

  }

}
