import { AdministrateurService } from 'src/app/services/administrateur.service';
import { AnneeService } from './../../../services/annee.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Annee } from 'src/app/modele/annee';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-annee',
  templateUrl: './annee.component.html',
  styleUrls: ['./annee.component.css']
})
export class AnneeComponent implements OnInit {
  proccessing=false;
  annees:any=[];
  closeResult = '';
  encours!:boolean;
  annee:Annee={
    id:0,
    libelle:'',
    code:'',
    encours:this.encours
}


  constructor(private service:AnneeService,private modalService: NgbModal,private toastr: ToastrService,private adminis:AdministrateurService) { }

  ngOnInit(): void {
    this.adminis.test==true;
    console.log("Lamine"+this.adminis.test);
    this.getAnnee();

  }


  errorsmsg(){
    this.toastr.warning("Echec enregistrement",'warnig')
}
successmsg(){
  this.toastr.success("Enregistrement effectuer avec succès",'Success')
}

successmsg1(){
  this.toastr.warning("Modification Année effectuer avec succès",'Success')
}
successmsg2(){
  this.toastr.warning("Supression Année effectuer avec succès",'Success')
}
  getAnnee()
  {
    this.proccessing=true;
    this.service.getAnnees().subscribe((data:any[])=>{
      this.annees=data;
      this.proccessing=false;
    })
  }
  Ajouter()
  {

    this.service.AjouterAnnee(this.annee).subscribe((data:{})=>{
      console.log(data);
      this.successmsg();
      this.getAnnee();

    })

  }

  edit_Annee()
  {
    this.service.Edit_Annee(this.annee.id,this.annee).subscribe((data:{})=>{
      console.log(data);
      this.successmsg1();
      this.ngOnInit();
    })
  }

  open(content:any,annee:Annee) {

    this.annee = annee;
    console.log("Objet:"+JSON.stringify(this.annee));
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open2(content:any,annee:Annee) {
    this.annee = annee;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

delete_Annee()
{
  this.service.delete_Annee(this.annee.id).subscribe((data:{})=>{
    console.log(data);
    this.successmsg2();
    this.ngOnInit();
  })

}








  open1(content:any) {

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
