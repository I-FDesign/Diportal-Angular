import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { Anuncio } from '../models/anuncio.model';
import { AuthenticationService } from './authentication.service';
import { UploadFileService } from './upload-file.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image } from '../models/image.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

import sweetAlert from 'sweetalert';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GeocoderService } from './geocoder.service';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  address: Address = new Address();

  constructor(
    private authenticationService: AuthenticationService,
    private uploadFileService: UploadFileService,
    private geocoderService: GeocoderService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) {

   }

  getAnuncio( id: string ) {
    return this.afs.collection('posts', ref => ref.where('id', '==', id)).valueChanges();
  }

  getImageUrl( image: Image ) {
    const pathReference = this.storage.ref(image.path);

    return pathReference.getDownloadURL();
  }

  uploadAnuncio( anuncio: Anuncio ) {

    anuncio.imagenes = this.uploadFileService.images;

    anuncio.id = new Date().valueOf().toString();

    if ( this.authenticationService.user ) {
      anuncio.uid = this.authenticationService.user.id;
    }

    // Getting province / state

    this.geocoderService.getProvinceFromCoords( anuncio.address )
        .subscribe( address => {
          anuncio.address.provincia = address.provincia;
          anuncio.address.provinciaFormatted = address.provinciaFormatted;

          // Parsing objects to the f*cking Firebase
          anuncio.address = JSON.parse(JSON.stringify(anuncio.address));

          new Promise( ( resolve, reject ) => {
            anuncio.imagenes.forEach((imagen, index) => { // Do you like it now Firebase?
              imagen.file = null;

              this.getImageUrl(imagen).pipe(

                catchError( (err) => {
                  reject(imagen.name);
                  return throwError( err );
                } )

              ).subscribe( url => {

                imagen.downloadUrl = url;
                anuncio.imagenes[index] = JSON.parse(JSON.stringify(imagen));

                if (index === anuncio.imagenes.length - 1) {
                  resolve('URL images obtained');
                }

              } );
            });
          } ).then( res => { // URL images already obtained
              this.afs.collection('posts').add( Object.assign({}, anuncio) ).then( () => {
                  sweetAlert(
                    'Anuncio subido correctamente.',
                    'Podras verlo o editarlo cuando lo desees',
                    'success')
                  .then((value) => {
                    this.router.navigate(['/search']);
                    // this.router.navigate(['/post', this.anuncio.id]);
                  });
              });
          }).catch( imageThatFailed => {
            const imgSeparated = imageThatFailed.split('_');
            const imgName = imgSeparated[imgSeparated.length - 1];

            sweetAlert(
              'Ha habido un problema en la subida de la imagen',
              'No se ha podido subir la imagen: ' + imgName +  ', intenta nuevamente, o prueba con otra.',
              'error')
            .then((value) => {
              window.location.reload();
            });
          } );

        } );

  }

}
