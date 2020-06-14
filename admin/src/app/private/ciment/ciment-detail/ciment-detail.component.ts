import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CimentService } from 'src/app/services/ciment.service';

@Component({
  selector: 'app-ciment-detail',
  templateUrl: './ciment-detail.component.html',
  styleUrls: ['./ciment-detail.component.scss']
})
export class CimentDetailComponent implements OnInit {
  @Input() id: string;
  item: any;
  constructor(
    private modalService: NgbModal,
    public cimentservice: CimentService
  ) { }

  ngOnInit(): void {
    console.log("id: ", this.id);
    if (this.id) this.cimentservice.getById(this.id).subscribe(
      res => {
        this.item = res;
      })
  }
  onClose() {
    this.modalService.dismissAll();
  }
}
