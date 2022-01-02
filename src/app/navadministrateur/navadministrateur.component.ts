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

  constructor(private service:AdministrateurService) { }

  ngOnInit(): void {
    this.test();
    //console.log("aziz"+this.service.test);
  }
  test()
  {
    if(this.login=='ziza97tiv@gmail.com')
    {
      this.variable=true;
      return;
    }
    this.variable=false;
  }




}
