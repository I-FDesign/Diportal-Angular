import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {

  apiKey = '09c4576d5cd64cc1822eb9a0d74d4f1f';
  language = 'es';
  searchLimit = '5';

  constructor(
    private http: HttpClient
  ) { }


  getAddress( address ) {
    let url = 'https://api.opencagedata.com/geocode/v1/json?q=' + address;
    url += '&key=' + this.apiKey;
    url += '&language=' + this.language;
    url += '&limit=' + this.searchLimit;

    return this.http.get(url).pipe(
      map( (res: any) => {
        return res.results;
      } )
    );
  }


  getAddressFromCoords( coords ) {
    let url = 'https://api.opencagedata.com/geocode/v1/json';
    url += '?key=' + this.apiKey;
    url += '&q=' + coords.lat + '+' + coords.lng;
    url += '&language=' + this.language;

    return this.http.get( url ).pipe(
      map( (res: any) => {
        return res.results;
      } )
    );

  }

}
