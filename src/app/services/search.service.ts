import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Filters } from '../models/filters.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  filters: Filters = new Filters('');

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

  getPostsFromProvince( province ) {
    return this.afs.collection('posts',
      ref => ref.where('address.provinciaFormatted', '==', province)
    ).valueChanges();
  }

  getPostsFromFilters( filters: Filters ) {
     console.log(filters.ambientes);
     console.log(1);
     // tslint:disable: radix
     return this.afs.collection
     ('posts', ref => ref
        .where('queDesea', '==', filters.queDesea)
        .where('tipo', '==', filters.tipo)
        // .where('ambientes', '>=', 1).orderBy('ambientes', 'asc')
      ).valueChanges();
  }

}
