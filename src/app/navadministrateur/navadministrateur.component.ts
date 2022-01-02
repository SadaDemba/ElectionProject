import { AdministrateurService } from 'src/app/services/administrateur.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navadministrateur',
  templateUrl: './navadministrateur.component.html',
  styleUrls: ['./navadministrateur.component.css']
})
export class NavadministrateurComponent implements OnInit {
login:any;
variable!:boolean;

  constructor(private service:AdministrateurService) { }

  ngOnInit(): void {
    this.variable=this.service.test;
    console.log("aziz"+this.service.test);
  }




}
