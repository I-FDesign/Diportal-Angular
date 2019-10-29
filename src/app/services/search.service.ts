import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getPosts(limit = 0) {
    if (limit > 0) {
      return this.afs.collection('posts', ref => ref.limit(limit))
      .valueChanges();
    } else {
      return this.afs.collection('posts').valueChanges();
    }
  }

  searchPosts( term: string ) {
    return this.afs.collection('posts',
      ref => ref.orderBy('address.calle')
                .startAt(term)
                .endAt(term + '\uf8ff')
    ).valueChanges();
  }

}
