import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GravierService {
graviers: Observable<any[]>;
  constructor(
    private afs: AngularFirestore
  ) { 
    this.load()
  }

  Add(data){
    this.afs.collection("graviers").add(data).then(
      res=> console.log(res)
    )
  }
  Edit(id,data){
    this.afs.collection("graviers").doc(id).update(data).then(
      res=> console.log(res)
    )
  }
  Delet(id){
    this.afs.collection("graviers").doc(id).delete().then(
      res=> console.log(res)
    )
  }
  load(){
    this.graviers=this.afs.collection("graviers").snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        return{id:a.payload.doc.id,data:a.payload.doc.data()}
      }))
    )
  }
  getAll(){
    return this.graviers;
  }

  getById(id){
   var docref = this.afs.collection("graviers").doc(id);
   return docref.get().pipe(map(doc=>doc.data())) 
  }
}
