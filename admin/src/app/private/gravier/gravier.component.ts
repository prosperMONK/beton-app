import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { GravierService } from 'src/app/services/gravier.service';

@Component({
  selector: 'app-gravier',
  templateUrl: './gravier.component.html',
  styleUrls: ['./gravier.component.scss']
})
export class GravierComponent implements OnInit {
  gravierForm: FormGroup;
  graviers: any[];
  isUpdating= false;
  id: string;
  constructor(
    private fb: FormBuilder,
    public gravierservice: GravierService
  ) { }

  ngOnInit(): void {
    this.InitForm();
    this.gravierservice.getAll().subscribe(
      res=> this.graviers=res
    )
  }
  InitForm(){
    this.gravierForm=this.fb.group({
      nom: ["", Validators.required],
      region: ["", Validators.required],
      Dmax: ["",Validators.required],
      Cc: ["",Validators.required],
      Cu: ["",Validators.required],
      Dab: ["",Validators.required],
      Dap: ["",Validators.required],
      G: ["",Validators.required],
      Granulometrie: this.fb.array([])
    })
  }
  addRow() {
    const add = this.gravierForm.get('Granulometrie') as FormArray;
    add.push(this.fb.group({
      module: [],
      passant: []
    }))
  }

  deleteRow(index: number) {
    const add = this.gravierForm.get('Granulometrie') as FormArray;
    add.removeAt(index)
  }  
  validateForm(){
    console.log(this.gravierForm.value)
   if(!this.isUpdating) this.gravierservice.Add(this.gravierForm.value);
   else this.gravierservice.Edit(this.id,this.gravierForm.value)
    this.InitForm();
    this.isUpdating=false;
    
  }
  onShow(i){}
  onEdit(id){
    this.id=id;
    this.isUpdating=true;
    this.gravierservice.getById(id).subscribe(
      res=> this.gravierForm.patchValue(res)
    )
  }
  onDelet(id){
    this.gravierservice.Delet(id)
  }
}
