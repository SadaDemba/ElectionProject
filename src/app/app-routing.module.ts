import { VotecandidatComponent } from './components/navbar/votecandidat/votecandidat.component';
import { ElectoralComponent } from './components/navbar/electoral/electoral.component';
import { AnneeComponent } from './components/navbar/annee/annee.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrateurComponent } from './components/navbar/administrateur/administrateur.component';
import { ConnexionComponent } from './components/navbar/connexion/connexion.component';
import { HeaderComponent } from './components/navbar/header/header.component';
import { InscriptionComponent } from './components/navbar/inscription/inscription.component';
import { VoterComponent } from './components/navbar/voter/voter.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CarteComponent } from './components/navbar/carte/carte.component';

const routes: Routes = [
  {path:'',component:CarteComponent},
  {path:'electoral',component:ElectoralComponent},
  {path:'connexion',component:ConnexionComponent},
  {path:'annee',component:AnneeComponent},
  {path:'inscription',component:InscriptionComponent},
  {path:'voter',component:VoterComponent},
  {path:'votecandidat/:cni',component:VotecandidatComponent},
  {path:'administrateur',component:AdministrateurComponent},
  {path:'carte',component:CarteComponent},
  // {path:'/',component:CarteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
