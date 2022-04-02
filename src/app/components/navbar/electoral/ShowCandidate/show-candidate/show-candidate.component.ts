import { ActivatedRoute } from '@angular/router';
import { ListelectoralService } from './../../../../../services/listelectoral.service';
import { ListElectoral } from 'src/app/modele/listelectoral';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.css']
})
export class ShowCandidateComponent implements OnInit {
liste!:ListElectoral;
id:any;
  constructor(private service:ListelectoralService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.service.getCandidatFindById(this.id).subscribe((varr)=>{
      this.liste=varr;
      console.log("Aziz ndiaye"+JSON.stringify( this.liste));
    })

  }

}
