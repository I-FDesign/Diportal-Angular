import { Injectable } from '@angular/core';
import { ODS_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  municipalitys: any[] = [];
  results: any[] = [];

  loading = false;

  constructor(
    public http: HttpClient
  ) { }

  searchMunicipalitys( term: string ) {

    const url = ODS_URL + '/api/records/1.0/search/?dataset=espana-municipios&q=' + term + '&rows=5';

    return this.http.get( url ).pipe( map( (res: any) => {
      this.municipalitys = [];

      if (res.records) {

        for ( let i = 0; i <= res.records.length - 1 ; i++ ) {

          if ( this.municipalitys.length < 5 ) {
            this.municipalitys.push(res.records[i]);
          } else {
            return;
          }

        }
      }
      return res.records;
    } ) );

  }


  searchFromCP( term: string ) {
    const url = ODS_URL + '/api/records/1.0/search/?dataset=espana-municipios&rows=5&refine.codigo_postal=' + term;

    return this.http.get( url ).pipe( map( (res: any) => {
      this.results = [];

      if (res.records.length > 0) {
        this.results[0] = res.records[0];
      }
      return res.records;
    } ) );
  }

}
