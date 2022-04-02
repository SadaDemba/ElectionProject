import { Component,ViewChild, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart} from "ng-apexcharts";
import { StatistiqueService } from 'src/app/services/statistique.service';

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
  tabDeNoms:string[]=[];
  tabDeVotes:number[]=[]
  region:string="";
  comm:string="";

  constructor(private service:StatistiqueService)
  {
    this.tabDeNoms=this.service.tabDeNoms;
    this.tabDeVotes=this.service.tabDeVotes;
    this.region=this.service.region;
    this.comm=this.service.comm;
    console.log("Région="+this.region+" | Commune="+this.comm);

    this.chartOptions = {
      series: this.tabDeVotes,
      chart: {
        width: 500,
        type: "pie"
      },
      labels: this.tabDeNoms,
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
  Commune():boolean
  {
    if(this.comm=="")
      return false;
    return true;
  }

}
