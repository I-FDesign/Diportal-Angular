import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Pipe({
  name: 'postImages'
})
export class PostImagesPipe implements PipeTransform {

  constructor(
    private storage: AngularFireStorage
  ) { }

  transform(path: any): any {

    const pathReference = this.storage.ref(path);

    pathReference.getDownloadURL().subscribe( url => {
      if (url) {
        console.log(url);
        return url;
      }
    } );
  }

}
