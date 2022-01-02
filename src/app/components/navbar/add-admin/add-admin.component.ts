import { AdministrateurService } from 'src/app/services/administrateur.service';
import { Administrateur } from './../../../modele/administrateur';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  administrateur:Administrateur={
    email: '',
    mdp: '',
    id: 0
  }

  constructor(private service:AdministrateurService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  successmsg(){
    this.toastr.success("Enregistrement effectuer avec succès",'Success')
  }
  ajouter()
  {
    this.service.createAdministrateur(this.administrateur).subscribe((data:{})=>{
      this.successmsg();
      this.ngOnInit();
    })
  }

}
