import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postType'
})
export class PostTypePipe implements PipeTransform {

  transform(value: any): any {
    if (value === 'alquiler') {
      return 'Alquila';
    }

    if (value === 'comprar') {
      return 'Vende';
    }

    if (value === 'vacacional') {
      return 'Vacacional';
    } else {
      return 'Servicio';
    }

  }

}
