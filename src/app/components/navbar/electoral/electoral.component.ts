import { CommuneService } from './../../../services/commune.service';
import { ListelectoralService } from './../../../services/listelectoral.service';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from 'ng-bootstrap';
import { ListElectoral } from 'src/app/modele/listelectoral';
import { ToastrService } from 'ngx-toastr';
import { UploadFileModel } from 'src/app/shared/classes/upload-file-model';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
@Component({
  selector: 'app-electoral',
  templateUrl: './electoral.component.html',
  styleUrls: ['./electoral.component.css']
})
export class ElectoralComponent implements OnInit  {
  listelectoral:any;
  closeResult = '';
  titre:any;
  proccessing=false;
  communes:any=[];
  liste= new ListElectoral()
  login: any;


  constructor(private route:ActivatedRoute,private service:ListelectoralService,private modalService: NgbModal,private communeservice:CommuneService,private toastr: ToastrService,public fileSrv: FileService) { }

  ngOnInit(): void {
    this.listelectoral=this.getListe();
    this.communes=this.getCommunes();
    this.login=this.route.snapshot.paramMap.get('login');
    console.log("je suis le login"+this.login);

  }

  errorsmsg(){
    this.toastr.warning("Echec enregistrement",'warnig')
}
successmsg(){
  this.toastr.success("Enregistrement effectuer avec succès",'Success')
}

successmsg1(){
  this.toastr.success("Modification liste effectuer avec succès",'Success')
}

successmsg2(){
  this.toastr.success("suppresion liste effectuer avec succès",'Success')
}

/* file upload */
     /* Variabe to store file data */
    public filedata:any;
    /* File onchange event */
    fileEvent(evt:any){
      this.fileSrv.convertImageToBase64String(evt)
      .then((data: string) => {
        this.liste.photo = data;
      })
      .catch(() => { });
    }


  getCommunes()
  {
    this.proccessing=true;
    this.communeservice.getCommunes().subscribe((data:any[])=>{
      this.communes=data;
      console.log(data);
      this.proccessing=false;
    })
  }


  getListe()
  {
    this.proccessing=true;
    this.service.getListes().subscribe((data:any[])=>{
      this.listelectoral=data;
      console.log(data);
      this.proccessing=false;
    })
  }
 addliste()
 {

  console.log(this.liste);

  this.service.AjouterListe(this.liste).subscribe((varr)=>{
    console.log("Aziz ndiaye"+this.liste);
    this.successmsg();
    this.ngOnInit();
  })
  this.ngOnInit();
 }


edit_list_electoral()
{
  this.service.Edit_Candidat(this.liste.id,this.liste).subscribe(data=>{
    this.successmsg1();
    this.ngOnInit();
})
}


open2(content:any,liste:ListElectoral) {
  this.liste = liste;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
    this.closeResult = `Closed with: ${result}`;

  }, (reason: any) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

supprimer()
{
  this.service.delete_candidat(Number(this.liste.id)).subscribe((data:{})=>{
    console.log(data);
    this.successmsg2();
    this.ngOnInit();
  })
}





 open1(content:any ,liste:ListElectoral) {
  this.liste=liste;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason: any) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}




  open(content:any ) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
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


  serarcharticle()
  {
    if(this.titre=="")
    {
      this.ngOnInit();
    }
    else
    {
      this.listelectoral=this.listelectoral.filter((result: ListElectoral)=>{
        return String(result.representant_prenom).toLocaleLowerCase().match(this.titre.toLocaleLowerCase());
      })
    }
  }



}
