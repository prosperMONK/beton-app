import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GravierService } from 'src/app/services/gravier.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  isUpdating = false;
  @Input() id: string;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public gravierservice: GravierService
  ) { }

  ngOnInit(): void {
    this.InitForm();
    console.log("id: ", this.id);
    if (this.id) this.gravierservice.getById(this.id).subscribe(
      res => {
        res.Granulometrie.forEach(element => {
        this.addRow();
        this.form.patchValue(res);
        });
        this.isUpdating = true
      }
    );
  }

  InitForm() {
    this.form = this.fb.group({
      nom: ["", Validators.required],
      region: ["", Validators.required],
      Dmax: ["", Validators.required],
      Cc: ["", Validators.required],
      Cu: ["", Validators.required],
      Dab: ["", Validators.required],
      Dap: ["", Validators.required],
      G: ["", Validators.required],
      Granulometrie: this.fb.array([])
    });

  }

  addRow() {
    const add = this.form.get('Granulometrie') as FormArray;
    add.push(this.fb.group({
      module: [],
      passant: []
    }))
  }

  addGranulometrie(){

  }


  deleteRow(index: number) {
    const add = this.form.get('Granulometrie') as FormArray;
    add.removeAt(index)
  }

  validateForm() {
    console.log(this.form.value);
    if (!this.isUpdating) this.gravierservice.Add(this.form.value);
    else this.gravierservice.Edit(this.id, this.form.value)
    this.onClose();
  }

  onClose() {
    this.modalService.dismissAll();
  }
}
