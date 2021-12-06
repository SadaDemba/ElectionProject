import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarteComponent } from './carte/carte.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ConnexionComponent } from './components/navbar/connexion/connexion/connexion.component';
import { InscriptionComponent } from './components/navbar/inscription/inscription.component';
import { VoterComponent } from './components/navbar/voter/voter.component';
import { HeaderComponent } from './components/navbar/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarteComponent,
    ConnexionComponent,
    InscriptionComponent,
    VoterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
