import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SableService } from 'src/app/services/sable.service';

@Component({
  selector: 'app-sable',
  templateUrl: './sable.component.html',
  styleUrls: ['./sable.component.scss']
})
export class SableComponent implements OnInit {
sableForm:FormGroup;
sables: any[];
isUpdating=false;
id: string;

  constructor(
    private fb: FormBuilder,
    public sableservice: SableService
  ) { }

  ngOnInit(): void {
    this.InitForm();
    this.sableservice.getAll().subscribe(
      res=> this.sables=res
    )
  }
InitForm(){
  this.sableForm=this.fb.group({
    nom: ["", Validators.required],
    region: ["", Validators.required],
    Cc: ["",Validators.required],
    Cu: ["",Validators.required],
    Dab: ["",Validators.required],
    Dap: ["",Validators.required],
    ES: ["",Validators.required],
    Granulometrie: this.fb.array([])
  })
  this.sableservice.getAll().subscribe(
    res=> this.sables=res
  )
}
  addRow() {
    const add = this.sableForm.get('Granulometrie') as FormArray;
    add.push(this.fb.group({
      module: [],
      passant: []
    }))
  }

  deleteRow(index: number) {
    const add = this.sableForm.get('Granulometrie') as FormArray;
    add.removeAt(index)
  }  
  validateForm(){
    console.log(this.sableForm.value)
    if(!this.isUpdating) this.sableservice.Add(this.sableForm.value);
    else this.sableservice.Edit(this.id,this.sableForm.value)
     this.InitForm();
     this.isUpdating=false;
    
  }
  onShow(i){}
  onEdit(id){
    this.id=id;
    this.isUpdating=true;
    this.sableservice.getById(id).subscribe(
      res=> this.sableForm.patchValue(res)
    )
  }
  onDelet(id){
    this.sableservice.Delet(id)
  }
}
