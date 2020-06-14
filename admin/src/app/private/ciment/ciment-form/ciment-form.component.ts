import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CimentService } from 'src/app/services/ciment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ciment-form',
  templateUrl: './ciment-form.component.html',
  styleUrls: ['./ciment-form.component.scss']
})
export class CimentFormComponent implements OnInit {
  form: FormGroup;
  ciments: any[];
  isUpdating = false;
  @Input() id: string;
  constructor(
    private modalService: NgbModal,
    public cimentservice: CimentService
  ) { }

  ngOnInit(): void {
    this.InitForm();
    console.log("id: ", this.id);
    if (this.id) this.cimentservice.getById(this.id).subscribe(
      res => {this.form.patchValue(res);
    this.isUpdating = true
  });
}

  InitForm() {
    this.form = new FormGroup({
      nom: new FormControl("", Validators.required),
      resistance: new FormControl("", Validators.required),
      Mvr: new FormControl("", Validators.required)
    })
  }
  validateForm() {
    console.log(this.form.value);
    if (!this.isUpdating) this.cimentservice.Add(this.form.value);
    else this.cimentservice.Edit(this.id, this.form.value)
    this.onClose();
  }

  onClose() {
    this.modalService.dismissAll();
  }
}
