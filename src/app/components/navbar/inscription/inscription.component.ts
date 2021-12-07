import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  expression!:boolean;
  constructor() { }

  ngOnInit(): void {
    this.expression=true;
  }

  disponible()
  {
    this.expression=false;

  }
}
