import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CimentService {
ciments: Observable<any[]>;
  constructor(

    private afs: AngularFirestore
    ) { 
      this.load()
    }
  
    Add(data){
      this.afs.collection("ciments").add(data).then(
        res=> console.log(res)
      )
    }
    Edit(id,data){
      this.afs.collection("ciments").doc(id).update(data).then(
        res=> console.log(res)
      )
    }
    Delet(id){
      this.afs.collection("ciments").doc(id).delete().then(
        res=> console.log(res)
      )
    }
    load(){
      this.ciments=this.afs.collection("ciments").snapshotChanges().pipe(
        map(actions=>actions.map(a=>{
          return{id:a.payload.doc.id,data:a.payload.doc.data()}
        }))
      )
    }
    getAll(){
      return this.ciments;
    }
  
    getById(id){
     var docref = this.afs.collection("ciments").doc(id);
     return docref.get().pipe(map(doc=>doc.data())) 
    }
  }
