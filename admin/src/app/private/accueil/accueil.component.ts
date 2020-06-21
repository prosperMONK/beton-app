import { Component, OnInit, Input } from '@angular/core';
import { GravierService } from 'src/app/services/gravier.service';
import { SableService } from 'src/app/services/sable.service';
import { CimentService } from 'src/app/services/ciment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BetonService } from 'src/app/services/beton.service';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  ciments: any[] = [];
  graviers: any[] = [];
  sables: any[] = [];
  selectForm: FormGroup;

  lineChartTension = 0;

  lineChartLegend = false;
  lineChartType = 'line';
  lineChartData = [];
  datasets: ChartDataSets[] = [{ label: '', type: null, data: [] }];
  lineChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    },
    title: {
      display: true,
      fontSize: 30,
      fontColor: 'red',
      text: "Courbe granulométrique",
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          // fontSize: 30,
          // fontColor: 'red',
          labelString: " % Passants",
        },
        ticks: {
          max: 100,
          min: 0,
          stepSize: 5
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          // fontSize: 30,
          // fontColor: 'red',
          labelString: "Diamètres des tamis en mm",
        },
        type: 'linear',
        ticks: {
          max: 48,
          min: 20,
          stepSize: 1,

        }
      }]
    }
  };

  gravierOptions = {
    lineChartColors: [
      {
        borderColor: '#007bff',
        backgroundColor: 'transparent'
      }
    ]

  }
  lineChartColors: Color[] = [
    {
      borderColor: '#007bff',
      backgroundColor: 'transparent'
    },
  ];
  gravier;
  sable;
  modules = [20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  constructor(
    private gravierservice: GravierService,
    private sableservice: SableService,
    private cimentservice: CimentService,
    private betonservice: BetonService
  ) { }

  ngOnInit(): void {
    this.cimentservice.getAll().subscribe(res => this.ciments = res);
    this.gravierservice.getAll().subscribe(res => this.graviers = res);
    this.sableservice.getAll().subscribe(res => this.sables = res);

    this.selectForm = new FormGroup({
      cimentId: new FormControl(null, Validators.required),
      gravierId: new FormControl(null, Validators.required),
      sableId: new FormControl(null, Validators.required),
      fc28: new FormControl(null, Validators.required),
      A: new FormControl(null, Validators.required)
    })
  }

  onSelectGravier(e) {
    let id = e.target.value;
    console.log(id);
    this.gravier = this.graviers.find(gravier => gravier.id === id);
    if (this.gravier.data.Granulometrie) {
      let lineChartData1 = this.gravier.data.Granulometrie.map(item => {
        let module = this.betonservice.DetMod(+item.module);
        return { x: module, y: item.passant };
      });
      this.datasets[0] = { data: lineChartData1, label: 'Gravier', type: 'line', backgroundColor: 'transparent', borderColor: '#007bff', lineTension: 0 }
    }

  }

  courbeOB() {
    let lineChartData2 = this.modules.map(item => {
      let x = item, y;
      let dmax2 = this.betonservice.abscisseA(this.gravier.data.Dmax);
      console.log(dmax2);
      if (item <= dmax2) y = this.betonservice.EquationOA(this.gravier.data.Dmax, x);
      return { x, y };
    });

    this.datasets[1] = { data: lineChartData2, label: 'OA', type: 'line', backgroundColor: 'transparent', borderColor: '#00ff00', lineTension: 0 }

    let lineChartData3 = this.modules.map(item => {
      let x = item, y;
      let dmax2 = this.betonservice.abscisseA(this.gravier.data.Dmax);
      console.log(dmax2);
      if (item >= dmax2) y = this.betonservice.EquationAB(this.gravier.data.Dmax, x);
      return { x, y };
    });

    this.datasets[2] = { data: lineChartData3, label: 'AB', type: 'line', backgroundColor: 'transparent', borderColor: '#00ff00', lineTension: 0 }
  }

  onSelectSable(e) {
    let id = e.target.value;
    console.log(id);
    this.sable = this.sables.find(sable => sable.id === id);
    if (this.sable.data.Granulometrie) {
      let lineChartData = this.sable.data.Granulometrie.map(item => {
        let module = this.betonservice.DetMod(+item.module);
        return { x: module, y: item.passant };
      });
      this.datasets[3] = { data: lineChartData, label: 'Sable', type: 'line', backgroundColor: 'transparent', borderColor: '#ff0000', lineTension: 0 }
      this.courbeOB();
      this.courbeCD();
    }
  }

  courbeCD() {
    // let lineChartData = this.modules.map(item => {
    //   let x = item, y;
    //   y = this.betonservice.EquationCD(this.gravier.data.Dmax, this.modules, x);
    //   // console.log('y de cd :', y)
    //   return { x, y };
    // });
    // let gModule = this.gravier.data.Granulometrie.map(item => {
    //   return this.betonservice.DetMod(+item.module);
    // })

    // let sModule = this.sable.data.Granulometrie.map(item => {
    //   return this.betonservice.DetMod(+item.module);
    // })
    // console.log('sModule:', sModule);
    // console.log('gModule:', gModule);

    let dmax2 = this.gravier.data.Dmax;
    let x95 = this.betonservice.detx5( this.sable.data.Granulometrie);
    let x5 = this.betonservice.detx95( this.gravier.data.Granulometrie);
    console.log('x5', x5);
    console.log('x95', x95)
    let lineChartData = [{
      x: x5,
      y: 5,
    },
    {
      x: x95,
      y: 95
    }];

    this.datasets[4] = { data: lineChartData, label: 'CD', type: 'line', backgroundColor: 'transparent', borderColor: '#ffff00', lineTension: 0 }
  }

  validateForm() {
    console.log(this.selectForm.value);
    let ciment = this.ciments.find(ciment => ciment.id === this.selectForm.value.cimentId);
    console.log(ciment);
    let gravier = this.graviers.find(gravier => gravier.id === this.selectForm.value.gravierId);
    console.log(gravier);
    this.betonservice
      .CalculC(this.selectForm.value.A, gravier.data.G, ciment.data.resistance, this.selectForm.value.fc28)
      .then(C => {
        console.log('C = ', C);

        //calcul de l'eau
        if (C === "400+fluidifiant") C = 400;
        let E = this.betonservice.calculE(C, this.betonservice.CparE(this.selectForm.value.fc28, gravier.data.G, ciment.data.resistance), gravier.data.Dmax);
        console.log('E = ', E);
      });

    //calcul Abscisse de A
    let XA = this.betonservice.abscisseA(gravier.data.Dmax);
    console.log('XA:', XA);

    //calcul Ordonnée de A
    let YA = this.betonservice.ordonnéeA(gravier.data.Dmax);
    console.log('YA:', YA);

    let EquationAB = this.betonservice.EquationAB(gravier.data.Dmax, 43);
    console.log('EquationAB:', EquationAB);

    let modules = gravier.data.Granulometrie.map(item => +item.module);
    console.log(modules);

    let detx95 = this.betonservice.detx95(gravier.data.Dmax);
    console.log('detx95:', detx95);

    let detx5 = this.betonservice.detx5(gravier.data.Dmax);
    console.log('detx5:', detx5);

    let EquationCD = this.betonservice.EquationCD(gravier.data.Dmax, modules);
    console.log('EquationCD:', EquationCD);

    //  let AbscSable=this.betonservice.AbscSable(gravier.data.Dmax, gravier.data.Granulometrie);
    //  let AbscGravier=this.betonservice.AbscGravier(gravier.data.Dmax, gravier.data.Granulometrie)
    //  console.log('AbscSable:',AbscSable);
    //  console.log('AbscGravier:',AbscGravier);
    //  console.log('ordSable:',this.betonservice.Ord(gravier.data.Dmax,AbscSable));
    //  console.log('ordgravier:',this.betonservice.Ord(gravier.data.Dmax,AbscGravier));
  }

}
