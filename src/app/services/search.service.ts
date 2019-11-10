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

  getPostsByFilters(filters, limit = 0) {
    let url = BACKEND_URL + '/anuncios/search';
    url += '?limit=' + limit;

    console.log(filters.filters);

    return this.http.post(url, filters);
  }

}
