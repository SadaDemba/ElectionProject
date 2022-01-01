import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
nombre!:number;
region:any;
  constructor() {
    var map = document.querySelector('#map');
    var paths = map?.querySelectorAll('.map-image a');
    var links = map?.querySelectorAll('.map-list a');


    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
          thisArg = thisArg || window;
          for (var i = 0; i < this.length; i++) {
              callback.call(thisArg, this[i], i, this);
          }
      };
  }

    paths?.forEach(function(path)
    {
      path.addEventListener('mouseenter', function(e)
      {
        console.log("salam!");
      });
    });
  }

  ngOnInit(): void {


  }

  cliquer(region:string)
  {
    this.region=region;
    if(this.region=='Fatick')
    {
      this.nombre=3;
    }
    else{
      this.nombre=0;
    }
  }
}
