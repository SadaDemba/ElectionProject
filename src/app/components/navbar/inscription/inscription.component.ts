import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  expression:number=0;
  constructor() { }

  ngOnInit(): void {
    this.expression=0;
  }

  disponible()
  {
    if(this.expression==2)
      this.expression=0;
    else
      this.expression++;

  }
}
