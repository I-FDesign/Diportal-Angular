import { Injectable, EventEmitter } from '@angular/core';
import { Image } from '../models/image.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  images: Image[] = [];

  uploadPercentage: Observable<number>;

  public downloadUrl = new EventEmitter();

  IMG_MAX_SIZE_MB = 10;

  constructor(
    private storage: AngularFireStorage
  ) { }

  saveImage(event) {

    const imageName = new Date().valueOf().toString() + '_' + event.file.name;

    const image = new Image(event.file, imageName, event.file.lastModified);

    this.images.push(image);
   }

   removeImage( event ) {
    this.images.forEach((image, index) => {
      if ( event.file.lastModified === image.lastModified ) {
        this.images.splice(index, 1);
        return;
      }
    });
   }

   checkImages() {
    const response = {
      isValid: true,
      size: 0
    };
    this.images.forEach( (image: any) => {
      const imgSize = image.file.size;
      const imgSizeOnMB = imgSize / 1024 / 1024;

      if ( imgSizeOnMB > this.IMG_MAX_SIZE_MB) {
        response.isValid = false;
        response.size = imgSizeOnMB;

        return;
      }
    } );

    return response;
   }

   uploadImage(image: Image) {

    const file = image.file;
    image.path = '/posts/' + image.name;
    const fileRef = this.storage.ref(image.path);
    const task = this.storage.upload(image.path, file);

    this.uploadPercentage = task.percentageChanges();

    return this.uploadPercentage.pipe(

      finalize( () => {
        fileRef.getDownloadURL().subscribe( url => {
          this.downloadUrl.emit(url);
        } );
      } )

    );

   }

}
