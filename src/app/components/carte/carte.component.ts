import { Component, OnInit } from '@angular/core';
import { map } from 'leaflet';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  
  
  constructor() {   }
  map= document.querySelector('#map');
  paths= this.map?.querySelectorAll('.map-image a');;
  links=this.map?.querySelectorAll('.map-list a');
  
  ngOnInit(): void {
    this.addForEach();
     this.map = document.querySelector('#map');
     this.paths = this.map?.querySelectorAll('.map-image a');
     this.links = this.map?.querySelectorAll('.map-list a');
    this.onEnteredMouse();
  
  
  }

  cliquer(region:string)
  {

    console.log('Clic sur la région de '+region);
  }

  


  addForEach()
  {
    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
          thisArg = thisArg || window;
          for (var i = 0; i < this.length; i++) {
              callback.call(thisArg, this[i], i, this);
          }
      };
    }
  }

  onEnteredMouse()
  {

    var activeArea=function(id: string)
  {
    document.querySelectorAll('.is-active').forEach(function(item)
    {
      item.classList.remove('is-active');
    })
    if(id !== "")
    {
      document.getElementById("list-"+id)?.classList.add("is-active");
        document.getElementById(id)?.classList.add("is-active");
    }      
  }
    
    this.paths?.forEach(function(path)
    {
      
      path.addEventListener('mouseenter', function(e)
      {
        var id = path.id;
        activeArea(id);

        
      });

      path.addEventListener('mouseleave', function(e)
      {
        activeArea("");
      });

    });



    this.links?.forEach(function(path)
    {
      
      path.addEventListener('mouseenter', function(e)
      {
        var id = path.id.replace('list-','');
        activeArea(id);
      });
      path.addEventListener('mouseleave', function(e)
      {
        activeArea("");
      });
    });

   
    

  }

  
  
}
