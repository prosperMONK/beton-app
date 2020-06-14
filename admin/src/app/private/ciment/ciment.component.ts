import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CimentService } from 'src/app/services/ciment.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CimentDetailComponent } from './ciment-detail/ciment-detail.component';
import { CimentFormComponent } from './ciment-form/ciment-form.component';

@Component({
  selector: 'app-ciment',
  templateUrl: './ciment.component.html',
  styleUrls: ['./ciment.component.scss']
})
export class CimentComponent implements OnInit {
  ciments: any[];
  isUpdating= false;
  closeResult: string;
  constructor(
    private modalService: NgbModal,
    public cimentservice: CimentService,
  ) { }

  ngOnInit(): void {
this.cimentservice.getAll().subscribe(
  res=> this.ciments=res
)
  }

  onShow(id){
    const data = this.modalService.open(CimentDetailComponent, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    data.componentInstance.id = id;
  }


  onAdd() {
    this.modalService.open(CimentFormComponent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onEdit(id){
    const data = this.modalService.open(CimentFormComponent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
    data.componentInstance.id = id;
  }
  onDelet(id){
    this. cimentservice.Delet(id)
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

