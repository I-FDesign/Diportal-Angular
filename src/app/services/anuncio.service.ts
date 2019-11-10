import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { Anuncio } from '../models/anuncio.model';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

import { GeocoderService } from './geocoder.service';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';
import { UploadFileService } from './upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  address: Address = new Address();

  constructor(
    private authenticationService: AuthenticationService,
    private geocoderService: GeocoderService,
    private http: HttpClient,
    private uploadFileService: UploadFileService
  ) {

   }

  getAnuncio( id: string ) {
    const url = BACKEND_URL + '/anuncios/' + id;
    return this.http.get(url);
  }

  uploadAnuncio( anuncio: Anuncio ) {

    if ( this.authenticationService.user ) {
      anuncio.uid = this.authenticationService.user._id;
    }

    // Getting province / state

    return new Promise( (resolve, reject) => {
      const provinceSubscriber =
        this.geocoderService.getProvinceFromCoords( anuncio.address )
        .subscribe( address => {
          provinceSubscriber.unsubscribe();

          anuncio.address.provincia = address.provincia;
          anuncio.address.provinciaFormatted = address.provinciaFormatted;

          const url = BACKEND_URL + '/anuncios';

          const images = this.uploadFileService.images;

          const subscriber =
            this.http.post(url, anuncio).subscribe( (anuncioDB: any) => {
              this.uploadFileService.uploadImages(images, anuncioDB.anuncio._id)
                  .then( () => {
                    subscriber.unsubscribe();
                    resolve(anuncioDB);
                  } );
            } );

        } );
    } );


  }

}
