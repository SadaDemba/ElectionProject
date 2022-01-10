import { AdministrateurService } from 'src/app/services/administrateur.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navadministrateur',
  templateUrl: './navadministrateur.component.html',
  styleUrls: ['./navadministrateur.component.css']
})
export class NavadministrateurComponent implements OnInit {
login:any=localStorage.getItem('login');
variable!:boolean;
administrateur:any;
role:any;
  constructor(private service:AdministrateurService) { }

  ngOnInit(): void {

   this.service.getAdministrateurwithrole(this.login).subscribe((data)=>{
    this.administrateur=data;
    console.log("I am"+JSON.stringify(this.administrateur) );
    this.role=this.administrateur.role;
    console.log("le role "+this.administrateur.role);
    this.test();
  })
  }
  test()
  { this.role=this.administrateur.role;
    if(this.login=='ziza97tiv@gmail.com' && this.role=='Super Administrateur')
    {
      this.variable=true;
      return;
    }
    this.variable=false;
  }




}
