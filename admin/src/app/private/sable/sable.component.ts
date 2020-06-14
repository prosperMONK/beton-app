import { Component, OnInit } from '@angular/core';
import { SableService } from 'src/app/services/sable.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SableDetailComponent } from './sable-detail/sable-detail.component';
import { SableFormComponent } from './sable-form/sable-form.component';

@Component({
  selector: 'app-sable',
  templateUrl: './sable.component.html',
  styleUrls: ['./sable.component.scss']
})
export class SableComponent implements OnInit {
sables: any[];
closeResult: string;
  constructor(
    private modalService: NgbModal,
    public sableservice: SableService
  ) { }

  ngOnInit(): void {
    this.sableservice.getAll().subscribe(
      res=> this.sables=res
    )
  }

  onShow(id){
    const data = this.modalService.open(SableDetailComponent, {ariaLabelledBy: 'modal-basic-title', size: 'xl'});
    data.componentInstance.id = id;
  }


  onAdd() {
    this.modalService.open(SableFormComponent, {ariaLabelledBy: 'modal-basic-title', size: 'lg',}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onEdit(id){
    const data = this.modalService.open(SableFormComponent, {ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    data.componentInstance.id = id;
  }
  onDelet(id){
    this. sableservice.Delet(id)
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
