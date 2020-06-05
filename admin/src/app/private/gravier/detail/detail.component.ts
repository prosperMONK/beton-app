import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GravierService } from 'src/app/services/gravier.service';
import { ChartDataSets, ChartData, ChartOptions, ChartTitleOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() id: string;
  item: any;
  lineChartTension = 0;

  lineChartLegend = false;
  lineChartType = 'line';
  lineChartData = [];
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
        scaleLabel:{
          display: true,
          // fontSize: 30,
          // fontColor: 'red',
          labelString: "Passants",
        },
        ticks: {
          max: 100,
          min: 0,
          stepSize: 10
        }
      }],
      xAxes: [{
        scaleLabel:{
          display: true,
          // fontSize: 30,
          // fontColor: 'red',
          labelString: "Modules",
        },
        type: 'linear',
        ticks: {
          max: 45,
          min: 0,
          stepSize: 5,

        }
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#007bff',
      backgroundColor: 'transparent'
    },
  ];

  constructor(
    private modalService: NgbModal,
    public gravierservice: GravierService
  ) { }

  ngOnInit(): void {
    console.log("id: ", this.id);
    if (this.id) this.gravierservice.getById(this.id).subscribe(
      res => {
        this.item = res;
        console.log(this.item.Granulometrie);
        if (this.item.Granulometrie) this.lineChartData = this.item.Granulometrie.map(item => {
          return { x: item.module, y: item.passant };
        });
      }
    );
  }

  onClose() {
    this.modalService.dismissAll();
  }

}
