import { StatistiqueService } from './../../../services/statistique.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commune } from 'src/app/modele/commune';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
nombre!:number;
region:any;
nbInscrits:number=0;
nbVotes:number=0;
tabDeNoms:string[]=[];
tabDeVotes:number[]=[];
communesList:string[]=[];

map = document.querySelector('#map');
paths = this.map?.querySelectorAll('.map-image a');
links = this.map?.querySelectorAll('.map-list a');
  clic: boolean=false;
  valeur: any;
  constructor(private service:StatistiqueService, private route:Router,private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.map = document.querySelector('#map');
    this.paths = this.map?.querySelectorAll('.map-image a');
    this.links = this.map?.querySelectorAll('.map-list a');
    this.polyfill();
    this.theListener();

  }

  polyfill()
  {

    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
          thisArg = thisArg || window;
          for (var i = 0; i < this.length; i++) {
              callback.call(thisArg, this[i], i, this);
          }
      };
    }
  }

  theListener()
  {
    this.paths?.forEach(function(path)
    {
      path.addEventListener('mouseenter', function(e)
      {
        var id:String=path.id;
        document.querySelectorAll(".is-active").forEach(function(item)
        {
          item.classList.remove('is-active');
        })
        document.getElementById(id.toString())?.classList.add('is-active');
        document.getElementById("list_"+id.toString())?.classList.add('is-active');

      });
      path.addEventListener('mouseleave',function(e)
      {
        var id:String=path.id;
        document.querySelectorAll(".is-active").forEach(function(item)
        {
          item.classList.remove('is-active');
        })
      })
    });

    this.links?.forEach(function(path)
    {
      path.addEventListener('mouseenter', function(e)
      {
        var id:String=path.id.replace('list_','');
        document.querySelectorAll(".is-active").forEach(function(item)
        {
          item.classList.remove('is-active');
        })
        document.getElementById(id.toString())?.classList.add('is-active');
        document.getElementById("list_"+id.toString())?.classList.add('is-active');

      });
      path.addEventListener('mouseleave',function(e)
      {
        var id:String=path.id.replace('list_','');;
        document.querySelectorAll(".is-active").forEach(function(item)
        {
          item.classList.remove('is-active');
        })
      })
    });

  }
  cliquer(region:string)
  {
    this.clic=true;
    //Récuperer ici le nom de la région et faire la requete pour recuper le tableau de communes
    //passer ce tableau à piechartComponent en utilisant un service
    this.region=region;
    this.service.getcommunesByRegion(this.region).subscribe((data)=>{
      this.communesList=[];
      data.forEach(element => {
        this.communesList.push(JSON.stringify(element.Libelle))

      });
     // console.log("Les communes de "+this.region+": "+JSON.stringify(data))
    })

      this.service.getcountStat(this.region).subscribe((data)=>{
        this.valeur=data;
        this.nombre=this.valeur[0].total;
      });
      this.service.getcountStatVotantInRegion(this.region).subscribe((data)=>{
       if(data.length!=0)
       {
        this.nbVotes=data[0].total.valueOf()
        console.log(JSON.stringify(this.nbVotes))
       }
      });
      this.service.getcountStatInscritInRegion(this.region).subscribe((data)=>{
        if(data.length!=0)
        {
          this.nbInscrits=data[0].total.valueOf()
          console.log(JSON.stringify(this.nbInscrits))
        }

       });

      this.tabDeNoms=[];
      this.tabDeVotes=[];
      this.service.getcountStatByCandidate(this.region).subscribe((data)=>{
        data.forEach(element => {
          this.tabDeNoms.push(JSON.stringify(element.NomListe))
          this.tabDeVotes.push(element.total.valueOf())
        });
        console.log(this.nbInscrits+" inscrits sur "+this.nbVotes+" votes")
         this.tabDeNoms.push("Suffrage non exprimé")
         this.tabDeVotes.push(this.nbInscrits-this.nbVotes)

      })

  }
  Visualiser(n:number,commune:string)
  {
    //Si on veut visualiser les résultats d'une commune,
    //faire ce qui est dans le premier if d'abord
    if(n==2)
    {
      commune=commune.replace('"','');
      commune=commune.replace('"','');
      console.log("la commune "+commune)
      this.service.getcountStatByCandidateInComm(commune).subscribe((data)=>{
        this.tabDeNoms=[];
        this.tabDeVotes=[];
        data.forEach(element => {

          console.log(element.NomListe+"-->"+element.total)

          this.tabDeNoms.push(JSON.stringify(element.NomListe))
          this.tabDeVotes.push(element.total.valueOf())

        });

        //console.log("Resulat commune de "+commune+": "+JSON.stringify(data))
      })

    }


    this.service.getStat().subscribe((data)=>
      {
        console.log(this.tabDeNoms+" et "+this.tabDeVotes)
      this.route.navigate(['/pieChart']);
      this.service.tabDeNoms=this.tabDeNoms;
      this.service.tabDeVotes=this.tabDeVotes;
      });
  }


}
