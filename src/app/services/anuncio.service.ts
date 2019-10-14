import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { Anuncio } from '../models/anuncio.model';
import { AuthenticationService } from './authentication.service';
import { UploadFileService } from './upload-file.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image } from '../models/image.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  address: Address = new Address();

  constructor(
    private authenticationService: AuthenticationService,
    private uploadFileService: UploadFileService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
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

    // Parsing objects to the f*ucking Firebase
    anuncio.address = JSON.parse(JSON.stringify(anuncio.address));

    anuncio.imagenes.forEach((imagen, index) => { // Do you like it Firebase?
      imagen.file = null;
      anuncio.imagenes[index] = JSON.parse(JSON.stringify(imagen));
    });


    return this.afs.collection('posts').add( Object.assign({}, anuncio) );

  }

}
