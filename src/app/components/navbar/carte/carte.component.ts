import { StatistiqueService } from './../../../services/statistique.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commune } from 'src/app/modele/commune';
import { Statcommune } from 'src/app/modele/statcommune';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
nombre!:number;
region:any;
codeCommune:string="";
nbInscrits:number=0;
nbVotes:number=0;
tabDeNoms:string[]=[];
tabDeVotes:number[]=[];
communesList:string[]=[] ;
test:boolean=false;

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
    this.test=false;
    this.service.getcommunesByRegion(this.region).subscribe((data)=>{

      this.communesList=[];
      data.forEach(element => {
        this.communesList.push(element.Libelle)
        this.test=true;
      });
    })

      this.service.getcountStat(this.region).subscribe((data)=>{
        this.valeur=data;
        this.nombre=this.valeur[0].total;
      });
      this.service.getcountStatVotantInRegion(this.region).subscribe((data)=>{
       if(data.length!=0)
       {
        this.nbVotes=data[0].total.valueOf()
       }
      });
      this.service.getcountStatInscritInRegion(this.region).subscribe((data)=>{
        if(data.length!=0)
        {
          this.nbInscrits=data[0].total.valueOf()

        }

       });

      this.tabDeNoms=[];
      this.tabDeVotes=[];
      this.service.getcountStatByCandidate(this.region).subscribe((data)=>{
        data.forEach(element => {
          this.tabDeNoms.push(JSON.stringify(element.NomListe))
          this.tabDeVotes.push(element.total.valueOf())
        });
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
      //remplacer le libelle de la commune par son code
      this.service.getCodeCommuneByLibelle(commune).subscribe((data)=>
      {
        this.codeCommune=data[0].Code;
        
        console.log (this.codeCommune);
        //Récuperer les resultats dans la commune indiqué en parametre
        this.service.getcountStatByCandidateInComm(this.codeCommune).subscribe((data)=>{
          //console.log (this.codeCommune);
           console.log(JSON.stringify(data)+" ok aussi.")
          this.tabDeNoms=[];
          this.tabDeVotes=[];
          data.forEach(element => {
            
            this.tabDeNoms.push(JSON.stringify(element.NomListe))
            this.tabDeVotes.push(element.total.valueOf())
  
          });
          //Renseigner le diagramme circulaire les données des résultats
          this.service.getStat().subscribe((data)=>
        {
          console.log(this.tabDeNoms+" - "+this.tabDeVotes);
          this.route.navigate(['/pieChart']);
          this.service.tabDeNoms=this.tabDeNoms;
          this.service.tabDeVotes=this.tabDeVotes;
        });
          
        })
        console.log(this.tabDeNoms+" ---- "+this.tabDeVotes);
       
        
      })



    }
    else{
      this.service.getStat().subscribe((data)=>
      {
        console.log(this.tabDeNoms+" - "+this.tabDeVotes);
        this.route.navigate(['/pieChart']);
        this.service.tabDeNoms=this.tabDeNoms;
        this.service.tabDeVotes=this.tabDeVotes;
      });
    }


    
  }


}
