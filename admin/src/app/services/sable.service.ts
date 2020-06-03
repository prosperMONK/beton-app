import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class SableService {
sables: Observable<any[]>;
  constructor(
    private afs: AngularFirestore
  ) { 
    this.load()
  }

  Add(data){
    this.afs.collection("sables").add(data).then(
      res=> console.log(res)
    )
  }
  Edit(id,data){
    this.afs.collection("sables").doc(id).update(data).then(
      res=> console.log(res)
    )
  }
  Delet(id){
    this.afs.collection("sables").doc(id).delete().then(
      res=> console.log(res)
    )
  }
  load(){
    this.sables=this.afs.collection("sables").snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        return{id:a.payload.doc.id,data:a.payload.doc.data()}
      }))
    )
  }
  getAll(){
    return this.sables;
  }

  getById(id){
   var docref = this.afs.collection("sables").doc(id);
   return docref.get().pipe(map(doc=>doc.data())) 
  }
  
}
