import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SableService } from 'src/app/services/sable.service';

@Component({
  selector: 'app-sable-form',
  templateUrl: './sable-form.component.html',
  styleUrls: ['./sable-form.component.scss']
})
export class SableFormComponent implements OnInit {
  form: FormGroup;
  isUpdating = false;
  @Input() id: string;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public sableservice: SableService
  ) { }

  ngOnInit(): void {
    this.InitForm();
    console.log("id: ", this.id);
    if (this.id) this.sableservice.getById(this.id).subscribe(
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
      Cc: ["", Validators.required],
      Cu: ["", Validators.required],
      Dab: ["", Validators.required],
      Dap: ["", Validators.required],
      ES: ["", Validators.required],
      Mf: ["", Validators.required],
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
    if (!this.isUpdating) this.sableservice.Add(this.form.value);
    else this.sableservice.Edit(this.id, this.form.value)
    this.onClose();
  }

  onClose() {
    this.modalService.dismissAll();
  }
}