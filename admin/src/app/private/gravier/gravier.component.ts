import { Component, OnInit, ViewChild } from '@angular/core';
import { GravierService } from 'src/app/services/gravier.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-gravier',
  templateUrl: './gravier.component.html',
  styleUrls: ['./gravier.component.scss']
})
export class GravierComponent implements OnInit {
  graviers: any[];
  closeResult: string;
// @ViewChild("mymodal") myModal :HTMLElement;

  constructor(
    private modalService: NgbModal,
    public gravierservice: GravierService
  ) { }

  ngOnInit(): void {
    this.gravierservice.getAll().subscribe(
      res=> this.graviers=res
    )
  }

 


  onShow(id){
    const data = this.modalService.open(DetailComponent, {ariaLabelledBy: 'modal-basic-title', size: 'xl'});
    data.componentInstance.id = id;
  }


  onAdd() {
    this.modalService.open(FormComponent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onEdit(id){
    const data = this.modalService.open(FormComponent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
    data.componentInstance.id = id;
  }
  onDelet(id){
    this.gravierservice.Delet(id)
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
