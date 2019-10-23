import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getPosts() {
    return this.afs.collection('posts').valueChanges();
  }

}
