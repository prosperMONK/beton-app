import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { LoginComponent } from './public/login/login.component';
import { GravierComponent } from './private/gravier/gravier.component';
import { SableComponent } from './private/sable/sable.component';
import { CimentComponent } from './private/ciment/ciment.component';
import { AccueilComponent } from './private/accueil/accueil.component';


const routes: Routes = [
  {path:"",redirectTo:"public", pathMatch:"full"},
  {
    path:"public", 
    component:PublicComponent,
    children:[
      {path:"", redirectTo:"login", pathMatch:"full"},
      {path:"login", component:LoginComponent}
    ]
  },
  {path:"private",
   component:PrivateComponent,
  children:[
    {path:"", redirectTo:"accueil", pathMatch:"full"},
    {path:"accueil", component:AccueilComponent},
    {path:"gravier", component:GravierComponent},
    {path:"sable", component:SableComponent},
    {path:"ciment", component:CimentComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
