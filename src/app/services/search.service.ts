import { Injectable } from '@angular/core';
import { Filters } from '../models/filters.model';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  filters: Filters = new Filters('');

  constructor(
    private http: HttpClient
  ) { }

  getPosts(limit = 0) {
    let url = BACKEND_URL + '/anuncios';
    url += '?limit=' + limit;

    return this.http.get(url);
  }

  getPostsFromProvince( province ) {
    // return this.afs.collection('posts',
    //   ref => ref.where('address.provinciaFormatted', '==', province)
    // ).valueChanges();
  }

  getPostsFromFilters( filters: Filters ) {
     // tslint:disable: radix
    //  return this.afs.collection
    //  ('posts', ref => ref
    //     .where('queDesea', '==', filters.queDesea)
    //     .where('tipo', '==', filters.tipo)
    //     // .where('ambientes', '>=', 1).orderBy('ambientes', 'asc')
    //   ).valueChanges();
  }

}
