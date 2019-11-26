import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'option'
})
export class OptionPipe implements PipeTransform {

  transform(option: any): any {

    option = option.replace(/_/g, ' ');
    option = option.charAt(0).toUpperCase() + option.slice(1);

    return option;
  }

}
