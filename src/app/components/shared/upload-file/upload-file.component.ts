import { Component, OnInit } from '@angular/core';
import { Image } from '../../../models/image.model';

declare function changeClearButton();

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  images: Image[] = [];

  constructor() { }

  ngOnInit() {
  }

  onUploadFinish(event) {
    changeClearButton();
    const image = new Image(event.src, event.file.name, event.file.lastModified);

    this.images.push(image);
   }

   imageRemoved( event ) {
    this.images.forEach((image, index) => {
      if ( event.file.lastModified === image.lastModified ) {
        this.images.splice(index, 1);
        return;
      }
    });
   }

}
