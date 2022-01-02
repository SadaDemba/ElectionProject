import { StatistiqueService } from './../../../services/statistique.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  voix:any=[];
  constructor(private statistique:StatistiqueService) { }

  ngOnInit(): void {
    this.getstat();
  }

getstat()
{
  this.statistique.getStat().subscribe((data:any[])=>{
    this.voix=data;
    console.log(data);
  })
}


}
