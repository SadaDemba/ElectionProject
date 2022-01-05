import { Electeur } from './../../../modele/electeur';
import { CommuneService } from './../../../services/commune.service';
import { AnneeService } from './../../../services/annee.service';
import { VoterService } from './../../../services/voter.service';
import { Voter } from './../../../modele/voter';
import { ListelectoralService } from './../../../services/listelectoral.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElecteurService } from 'src/app/services/electeur.service';
import { Annee } from 'src/app/modele/annee';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionService } from 'src/app/services/region.service';
@Component({
  selector: 'app-votecandidat',
  templateUrl: './votecandidat.component.html',
  styleUrls: ['./votecandidat.component.css']
})
export class VotecandidatComponent implements OnInit {
  var:any;
  imageDirectoyPath:any ="C:/xamp/htdocs/livecoding/storage/app/profils/61bca4e238f3f.png";
  closeResult = '';
  communes:any=[];
  cni:any;
  veri:any;
  comms:any=[];
  candidats:any=[];
  annee:any=[];
  encours:any=[];
  commObjet:any;
  annees:Annee=
  {
    id: 0,
    code: '',
    libelle: '',
    encours: false
  }


  electeur:Electeur={
    id: 0,
    prenom: '',
    nom: '',
    adresse: '',
    cni: '',
    datenaissance: '',
    comm_id: 0,
  }


  vote:Voter={
    id: 0,
    electeur_id: 0,
    listeelectoral_id: 0,
    annee_id:0,
  }



  constructor(private route:ActivatedRoute,private servic:CommuneService,private router: Router,private service:ElecteurService,private serv:ListelectoralService,private voteservice:VoterService,private anneeservice: AnneeService,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cni = this.route.snapshot.paramMap.get('cni');
    console.log('je suis'+this.cni);
    this.service.verifierCni(this.cni).subscribe(data=>{
      this.veri= data;
      this.vote.electeur_id=this.veri.id;
      console.log(this.vote.electeur_id);
    });

    this.serv.getcandidats(this.cni).subscribe(data=>{
      this.candidats=data;
      this.vote.listeelectoral_id=this.candidats.id;

    });

    this.anneeservice.AnneeEncours().subscribe(data=>{
      this.annee=data;
      this.vote.annee_id=this.annee[0].id;
    });



    this.servic.getCommunes().subscribe((data:any[])=>{
      this.communes=data;
    })


  }



errorsmsg(){
    this.toastr.error("Désolé vous avez dèja voté",'error');
}
successmsg(){
  this.toastr.success("Vote effectuer avec succes",'Success');
}

successmsg1(){
  this.toastr.success("Mis à jour de votre commune de vote effectué avec succes",'Success');
}


  check(l:any){
    this.vote.listeelectoral_id=l.annee;
  }


  Edit_Commune_electeur()
  {
    this.electeur.id=this.veri.id;
    this.electeur.prenom=this.veri.prenom;
    this.electeur.nom=this.veri.nom;
    this.electeur.cni=this.veri.cni;
    this.electeur.adresse=this.veri.adresse;
    this.electeur.datenaissance=this.veri.datenaissance;


    this.voteservice.Edit_commune_Electeur(this.electeur.id,this.electeur).subscribe(data=>{
        this.successmsg1();
        this.ngOnInit();
    })
  }



  Addvote()
  {
    console.log("la Date"+this.vote.annee_id);
    console.log("Sada"+this.vote.electeur_id);
    console.log("Aziz "+this.vote.listeelectoral_id);
    this.voteservice.AjouterElecteur(this.vote).subscribe((varr)=>{
   this.var=varr;
    if(this.var===1)
    {
      this.errorsmsg();
    }
    else
    {
      this.successmsg();
    }

    })
  }









  open(content:any,vote:Voter) {

    this.vote = vote;
    console.log("Objet:"+JSON.stringify(this.vote));
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
