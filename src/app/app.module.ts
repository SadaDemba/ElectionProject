import { AddAdminComponent } from './components/navbar/add-admin/add-admin.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarteComponent } from './components/navbar/carte/carte.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ConnexionComponent } from './components/navbar/connexion/connexion.component';
import { InscriptionComponent } from './components/navbar/inscription/inscription.component';
import { VoterComponent } from './components/navbar/voter/voter.component';
import { HeaderComponent } from './components/navbar/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdministrateurComponent } from './components/navbar/administrateur/administrateur.component';
import { AnneeComponent } from './components/navbar/annee/annee.component';
import { ElectoralComponent } from './components/navbar/electoral/electoral.component';
import { VotecandidatComponent } from './components/navbar/votecandidat/votecandidat.component';
import { EditLieuVoteComponent } from './components/navbar/voter/changement-lieu-de-vote/edit-lieu-vote/edit-lieu-vote.component';
import { NavadministrateurComponent } from './navadministrateur/navadministrateur.component';
import { StatistiquesComponent } from './components/navbar/statistiques/statistiques.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnexionComponent,
    InscriptionComponent,
    VoterComponent,
    HeaderComponent,
    AdministrateurComponent,
    AnneeComponent,
    ElectoralComponent,
    CarteComponent,
    VotecandidatComponent,
    EditLieuVoteComponent,
    AddAdminComponent,
    NavadministrateurComponent,
    StatistiquesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule, BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
