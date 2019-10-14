import { Component, OnInit } from '@angular/core';
import { Image } from '../../../models/image.model';
import { UploadFileService } from '../../../services/upload-file.service';

declare function changeClearButton();

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor(
    public uploadFileService: UploadFileService
  ) { }

  ngOnInit() {
  }

  onUploadFinish(event) {
    changeClearButton();
    this.uploadFileService.saveImage(event);
   }

   imageRemoved( event ) {
    this.uploadFileService.removeImage( event );
   }

}
