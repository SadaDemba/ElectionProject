import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarteComponent } from './carte/carte.component';
import { ConnexionComponent } from './components/navbar/connexion/connexion.component';
import { HeaderComponent } from './components/navbar/header/header.component';
import { InscriptionComponent } from './components/navbar/inscription/inscription.component';
import { VoterComponent } from './components/navbar/voter/voter.component';

const routes: Routes = [
  {path:'connexion',component:ConnexionComponent},
  {path:'inscription',component:InscriptionComponent},
  {path:'voter',component:VoterComponent},
  // {path:'/',component:CarteComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
