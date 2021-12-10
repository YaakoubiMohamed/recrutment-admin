import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CondidatureService {

  constructor(public afs:AngularFirestore) { }

  addCondidature(condidature){
    this.afs.collection('condidatures').add(condidature);
  }

  getCondidaturesListe(){
    return this.afs.collection('condidatures').snapshotChanges();
  }

  getCondidature(id){
    this.afs.collection('condidatures').doc(id).get();
  }

  editCondidature(condidature, id){
    this.afs.collection('condidatures').doc(id).update(condidature);
  }

  deleteCondidature(id){
    this.afs.collection('condidatures').doc(id).delete();
  }
}
