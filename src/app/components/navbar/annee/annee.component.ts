import { AnneeService } from './../../../services/annee.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Annee } from 'src/app/modele/annee';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private service:AnneeService,private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAnnee();
  }


  errorsmsg(){
    this.toastr.warning("Echec enregistrement",'warnig')
}
successmsg(){
  this.toastr.success("Enregistrement effectuer avec succès",'Success')
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
