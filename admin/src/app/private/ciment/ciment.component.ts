import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CimentService } from 'src/app/services/ciment.service';

@Component({
  selector: 'app-ciment',
  templateUrl: './ciment.component.html',
  styleUrls: ['./ciment.component.scss']
})
export class CimentComponent implements OnInit {
  cimentForm: FormGroup;
  ciments: any[];
  isUpdating= false;
  id: string;
  constructor(
    public cimentservice: CimentService
  ) { }

  ngOnInit(): void {
this.InitForm();
this.cimentservice.getAll().subscribe(
  res=> this.ciments=res
)
  }
  InitForm(){
    this.cimentForm = new FormGroup({
      nom: new FormControl("", Validators.required),
      resistance: new FormControl("", Validators.required),
      Mvr: new FormControl("", Validators.required)
    })
  }

  validateForm() {
    console.log(this.cimentForm.value)
    if(!this.isUpdating) this.cimentservice.Add(this.cimentForm.value);
    else this.cimentservice.Edit(this.id,this.cimentForm.value)
     this.InitForm();
     this.isUpdating=false;
  }
  onShow(i) { }
  onEdit(id) { 
    this.id=id;
    this.isUpdating=true;
    this.cimentservice.getById(id).subscribe(
      res=> this.cimentForm.patchValue(res)
    )
  }
  onDelet(id) {
    this.cimentservice.Delet(id)
   }
}

