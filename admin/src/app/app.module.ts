import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from  './private/private.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {  AngularFireAuthModule} from '@angular/fire/auth';
import { LoginComponent } from './public/login/login.component';
import { AccueilComponent } from './private/accueil/accueil.component';
import { GravierComponent } from './private/gravier/gravier.component';
import { CimentComponent } from './private/ciment/ciment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './private/gravier/form/form.component';
import { DetailComponent } from './private/gravier/detail/detail.component';
import { ChartsModule } from 'ng2-charts';
import { SableComponent } from './private/sable/sable.component';
import { SableFormComponent } from './private/sable/sable-form/sable-form.component';
import { SableDetailComponent } from './private/sable/sable-detail/sable-detail.component';
import { CimentFormComponent } from './private/ciment/ciment-form/ciment-form.component';
import { CimentDetailComponent } from './private/ciment/ciment-detail/ciment-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent,
    LoginComponent,
    AccueilComponent,
    GravierComponent,
    CimentComponent,
    FormComponent,
    DetailComponent,
    SableComponent,
    SableFormComponent,
    SableDetailComponent,
    CimentFormComponent,
    CimentDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
   AngularFirestoreModule,
   AngularFireAuthModule,
   FormsModule,
   ReactiveFormsModule,
   NgbModule,
   ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
