import { StatistiqueService } from './../../../services/statistique.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
nombre!:number;
region:any;
tabDeNoms:string[]=[];
tabDeVotes:number[]=[];

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
    // if(this.region=='Fatick')
    // {
    //   this.nombre=3;
    // }
    // else{
    //   this.nombre=0;
    // }
      this.service.getcountStat(this.region).subscribe((data)=>{
        this.valeur=data;
        this.nombre=this.valeur[0].total;
        console.log("je suis le nombre de votant"+JSON.stringify(this.valeur));
      })

      this.service.getcountStatByCandidate(this.region).subscribe((data)=>{
        data.forEach(element => {
          this.tabDeNoms.push(JSON.stringify(element.NomListe))
          this.tabDeVotes.push(element.total.valueOf())
        });
        console.log("les candidats:"+this.tabDeNoms+".\tLes votes"+this.tabDeVotes);
      })

  }
  Visualiser()
  {
    if(this.valeur[0].total!=0)
    {
      this.route.navigate(['/pieChart']);
      this.service.tabDeNoms=this.tabDeNoms;
      this.service.tabDeVotes=this.tabDeVotes;
    }
    else
    this.toastr.error("Il n'y a rien a visualiser",'Erreur');
  }


}
