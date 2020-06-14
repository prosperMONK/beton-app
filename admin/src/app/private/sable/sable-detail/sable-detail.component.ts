import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SableService } from 'src/app/services/sable.service';

@Component({
  selector: 'app-sable-detail',
  templateUrl: './sable-detail.component.html',
  styleUrls: ['./sable-detail.component.scss']
})
export class SableDetailComponent implements OnInit {
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
          labelString: " % Passants",
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
          labelString: "Diamètres des tamis en mm",
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
    public sableservice: SableService
  ) { }

  ngOnInit(): void {
    console.log("id: ", this.id);
    if (this.id) this.sableservice.getById(this.id).subscribe(
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

