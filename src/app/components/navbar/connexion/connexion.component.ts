
import { Component, OnInit } from '@angular/core';
import { Administrateur } from 'src/app/modele/administrateur';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdministrateurService } from 'src/app/services/administrateur.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {


  login!:'';
  mdp!:'';

  veri:any=[];
  constructor(private service:AdministrateurService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  errorsmsg(){
    this.toastr.error("Login ou mot de passe incorrecte ou vous n'etes pas administrateur",'Error')
}
successmsg(){
  this.toastr.success("connexion réussie bienvenue",'Success')
}
  verifier()
  {

    this.service.authentification(this.login,this.mdp).subscribe(data=>{
      this.veri=data;
      if(!data)
      {
        this.errorsmsg();
      }
      else
      {
        this.router.navigate(['/electoral']);
        this.successmsg();
      }
    })

  }

}
