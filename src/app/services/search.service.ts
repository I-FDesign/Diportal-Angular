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

  transformFilter(value) {
    const filter = value.toLowerCase();

    const filterParts = filter.split(' ');

    let filterWithoutSpaces = '';

    let formattedValue = '';

    if ( filterParts.length <= 1 ) {
      formattedValue = filter;
    } else {
      filterParts.forEach((filterPart, index) => {
        if (index !== filterParts.length - 1 ) {
          filterWithoutSpaces += filterPart + '_' ;
        } else {
          filterWithoutSpaces += filterPart;
        }
      });

      formattedValue = filterWithoutSpaces;
    }

    return formattedValue;
  }

  getPosts(term = '', page = 1) {
    let url = BACKEND_URL + '/anuncios';
    if (term && term.length > 0) {
      url += '/' + term;
    }
    url += '?page=' + page;

    return this.http.get(url);
  }

  getPostsByFilters(filters, page = 1) {
    let url = BACKEND_URL + '/anuncios/search';
    url += '?page=' + page;

    return this.http.post(url, filters);
  }

}
