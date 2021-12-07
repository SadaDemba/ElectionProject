import { RegionService } from './../../../services/region.service';
import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/modele/region';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  expression!:boolean;
  regions:any=[];
  objet:any=[];
  region:Region={
    id:0,
    libelle:'',
    code:'',
}
  constructor(private service:RegionService) { }

  ngOnInit(): void {
    this.expression=true;
    this.regions=this.getRegion();
  }

  disponible()
  {
    this.expression=false;

  }

  getRegion()
  {
    this.service.getRegions().subscribe((data:any[])=>{
      this.regions=data;
      console.log(this.regions);
    })
  }
}
