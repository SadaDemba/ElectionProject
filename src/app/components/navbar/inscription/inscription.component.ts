import { ElecteurService } from './../../../services/electeur.service';
import { Electeur } from './../../../modele/electeur';
import { Commune } from './../../../modele/commune';
import { RegionService } from './../../../services/region.service';
import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/modele/region';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  expression:number=0;
  regions:any=[];
  communes:any=[];
  centres:any=[];
  comms:any=[];
  regionObj:any;
  communeObj:any;
  commObjet:any;
  commune:Commune={
    id:0,
    libelle:'',
    code:'',
    region_id:0
}
  region:Region={
    id:0,
    libelle:'',
    code:'',
}
variable:any;
electeur:Electeur={
  id:0,
  prenom:'',
  nom:'',
  datenaissance:'',
  adresse:'',
  cni:'',
  comm_id:0
}




  constructor(private service:RegionService,private serv:ElecteurService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.expression=0;
    this.regions=this.getRegion();
  }


  errorsmsg(){
    this.toastr.error("Désolé vous etes dèja inscrit",'error');
}
successmsg(){
  this.toastr.success("Inscription effectuer avec succes",'Success');
}





  disponible()
  {
    if(this.expression==3)
      this.expression=0;
    else
      this.expression++;

      this.service.getCommunes(this.regionObj).subscribe((data:any[])=>{
        this.communes=data;
        console.log(data);
      })

      this.service.getCentres(this.communeObj).subscribe((data:any[])=>{
        this.centres=data;
        console.log(data);
      })

      this.service.getComms(this.commObjet).subscribe((data:any[])=>{
        this.comms=data;
        console.log(data);
      })
  }

  getRegion()
  {
    this.service.getRegions().subscribe((data:any[])=>{
      this.regions=data;
      console.log(this.regions);
    })
  }

  AddElecteur()
  {
    console.log(this.electeur);

    this.serv.AjouterElecteur(this.electeur).subscribe((varr)=>{
    console.log(varr);
    this.variable=varr;

    if(this.variable===1)
    {
      this.errorsmsg();
      this.ngOnInit();
    }
    else
    {
      this.successmsg();
      this.ngOnInit();
    }

    })
  }

}
