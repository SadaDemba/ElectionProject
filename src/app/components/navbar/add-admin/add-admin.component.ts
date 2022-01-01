import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  login!:'';
  mdp!:'';
  constructor() { }

  ngOnInit(): void {
  }

  verifier()
  {
    
  }

}
