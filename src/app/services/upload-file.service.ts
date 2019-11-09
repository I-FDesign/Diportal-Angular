import { Injectable } from '@angular/core';
import { Image } from '../models/image.model';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  images: Image[] = [];

  uploadPercentage: string = null;

  IMG_MAX_SIZE_MB = 10;

  constructor(
    private http: HttpClient
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

   uploadImages(images: Image[], anuncioId: string) {

      return new Promise( (resolve, reject) => {

        const formData = new FormData();

        images.forEach(image => {
          formData.append('photos', image.file);
        });

        const url = BACKEND_URL + '/upload/' + anuncioId;

        this.http.post(url, formData).subscribe( (resp: any) => {
          if (resp.ok) {
            this.uploadPercentage = '100';
            resolve('Images uploaded');
          }
        } );

      } );

   }

}
