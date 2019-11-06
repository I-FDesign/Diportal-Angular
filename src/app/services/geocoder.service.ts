import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Address } from '../models/address.model';
import { ODS_URL } from '../config/config';

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

  sanitizeProvince(province) {
    // Characters to delete
    const specialChars = '!@#$^&%*()+=-[]\/{}|:<>?,.';

    // Deleting special characters
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < specialChars.length; i++) {
        province = province.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
    }

    province = province.replace(/á/gi, 'a');
    province = province.replace(/é/gi, 'e');
    province = province.replace(/í/gi, 'i');
    province = province.replace(/ó/gi, 'o');
    province = province.replace(/ú/gi, 'u');
    province = province.replace(/ñ/gi, 'n');

    province = province.toLowerCase();

    // Removing whitespaces
    province = province.replace(/ /g, '');

    return province;
  }


  getProvinceFromCoords( address: Address ) {

    let url = ODS_URL + '/api/records/1.0/search/?dataset=provincias-espanolas';
    url += '&lang=es&sort=provincia&facet=provincia&geofilter.distance=';
    url += address.latitud + '%2C' + address.longitud;

    return this.http.get(url).pipe(
      map( (res: any) => {
        const provincia = res.records[0].fields.provincia;
        address.provincia = provincia;

        address.provinciaFormatted = this.sanitizeProvince(provincia).toString();

        return address;
      } )
    );

  }

}
