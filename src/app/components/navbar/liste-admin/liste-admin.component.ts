import { Administrateur } from 'src/app/modele/administrateur';
import { Component, OnInit } from '@angular/core';
import { AdministrateurService } from 'src/app/services/administrateur.service';
import {NgbModal, ModalDismissReasons} from 'ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.css']
})
export class ListeAdminComponent implements OnInit {
administrateurs:any=[];
closeResult = '';
liste:Administrateur={
  id: 0,
  email: '',
  mdp: '',
  role: '',
}

  constructor(private service:AdministrateurService,private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getAdministrateur().subscribe((data:any[])=>{
      this.administrateurs=data;
    })

  }

  supprimer(){
    this.service.delete_Administrateur(this.liste.id).subscribe((data:{})=>{
      console.log(data);
      this.successmsg2();
      this.ngOnInit();
    })


  }

  successmsg2(){
    this.toastr.success("suppresion administrateur effectuer avec succès",'Success')
  }
  open2(content:any,liste:Administrateur) {
    this.liste = liste;
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
