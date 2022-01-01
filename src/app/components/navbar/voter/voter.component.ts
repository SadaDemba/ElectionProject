import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElecteurService } from 'src/app/services/electeur.service';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit {

  constructor(private router: Router,private service:ElecteurService,private toastr: ToastrService) { }
  cni!:'';
  veri:any=[];
  ngOnInit(): void {
  }

  errorsmsg(){
    this.toastr.error("Echec de connexion",'error');
}
successmsg(){
  this.toastr.success("connexion réussie",'Success');
}


  verifier()
  {
    this.service.verifierCni(this.cni).subscribe(data=>{
      this.veri=data;
      console.log(data);
      if(data.length==0)
      {
        this.errorsmsg();
      }
      else
      {
        this.router.navigate(['/votecandidat/'+this.cni]);
        this.successmsg();

      }


    })

  }



}
