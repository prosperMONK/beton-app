import { Component, OnInit, Input } from '@angular/core';
import { GravierService } from 'src/app/services/gravier.service';
import { SableService } from 'src/app/services/sable.service';
import { CimentService } from 'src/app/services/ciment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BetonService } from 'src/app/services/beton.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
ciments: any[]=[];
graviers: any[]=[];
sables: any[]=[];
selectForm:FormGroup;
  constructor(
    private gravierservice: GravierService,
    private sableservice: SableService,
    private cimentservice: CimentService,
    private betonservice: BetonService
  ) { }

  ngOnInit(): void {
    this.cimentservice.getAll().subscribe(res=> this.ciments=res);
    this.gravierservice.getAll().subscribe(res=> this.graviers=res);
    this.sableservice.getAll().subscribe(res=>this.sables=res);

    this.selectForm=new FormGroup({
      cimentId: new FormControl(null, Validators.required),
      gravierId: new FormControl(null, Validators.required),
      sableId: new FormControl(null,Validators.required),
      fc28: new FormControl(null,Validators.required),
      A: new FormControl(null,Validators.required)
    })
  }

  validateForm(){
    console.log(this.selectForm.value);
    let ciment=this.ciments.find(ciment=>ciment.id===this.selectForm.value.cimentId);
    console.log(ciment);
    let gravier=this.graviers.find(gravier=>gravier.id===this.selectForm.value.gravierId);
    console.log(gravier)
    this.betonservice
    .CalculC(this.selectForm.value.A,gravier.data.G,ciment.data.resistance,this.selectForm.value.fc28)
    .then(C => {
      console.log('C = ',C);

      //calcul de l'eau
      if (C==="400+fluidifiant") C=400;
     let E = this.betonservice.calculE(C, this.betonservice.CparE(this.selectForm.value.fc28,gravier.data.G,ciment.data.resistance),gravier.data.Dmax);
     console.log('E = ',E);
    })

    //calcul Abscisse de A
    let XA= this.betonservice.abscisseA(gravier.data.Dmax);
    console.log('XA:',XA);

     //calcul Ordonnée de A
     let YA=this.betonservice.ordonnéeA(gravier.data.Dmax);
     console.log('YA:',YA);

     let AbscSable=this.betonservice.AbscSable(gravier.data.Dmax, gravier.data.Granulometrie);
    //  let AbscGravier=this.betonservice.AbscGravier(gravier.data.Dmax, gravier.data.Granulometrie)
     console.log('AbscSable:',AbscSable);
    //  console.log('AbscGravier:',AbscGravier);
     console.log('ordSable:',this.betonservice.Ord(gravier.data.Dmax,AbscSable));
    //  console.log('ordgravier:',this.betonservice.Ord(gravier.data.Dmax,AbscGravier));
  }

}
